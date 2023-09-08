import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Animated,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    SectionList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {get, set} from 'lodash';
import FormInputField from '../../components/form-fields/form-input-field/FormInputField';
import FormCheckboxField from '../../components/form-fields/form-checkbox-field/FormCheckboxField';
import FormDropdownField from '../../components/form-fields/form-dropdown-field/FormDropdownField';
import FormImageField from '../../components/form-fields/form-image-field/FormImageField';
import FormMultiselectField from '../../components/form-fields/form-multislect-field/FormMultiselectField';
import FormRadioField from '../../components/form-fields/form-radio-field/FormRadioField';
import FormToggleField from '../../components/form-fields/form-toggle-field/FormToggleField';
import {
    Button,
    ButtonColor,
    ButtonSize,
    ButtonType,
    ButtonWidth,
} from '../../components/button/Button';
import {privateApi} from '../../services/api/ApiConfig';
import {useUser} from '../../contexts/UserContext';

interface DatabaseTarget {
    database: string;
    object: string;
    property: string;
}

interface FieldDetails {
    type: string;
    label?: string;
    placeholder?: string;
    options?: string[];
    inputType?: 'text' | 'number';
    secureTextEntry?: boolean;
    isChecked?: boolean;
    mediaType?: 'photo' | 'video' | 'mixed';
    columns?: number;
    fields?: FieldConfig[];
    groupLabel?: string;
}

interface FieldConfig {
    name: string;
    details: FieldDetails;
    databaseTarget?: DatabaseTarget;
}

type FieldItem = {
    name: string;
    details: any; // Replace 'any' with the appropriate type for your field details
  };
  
  type Section = {
    title: string;
    data: FieldItem[];
  };

export interface ApiConfig {
    fetch: {
        endpoint: string;
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        params?: {includeUserId: boolean};
    };
    update: {
        endpoint: string;
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        params?: {includeUserId: boolean};
    };
}

export interface ObjectConfig {
    name: string;
    apiConfig: ApiConfig;
}

export interface ObjectParameter {
    name: string;
    data: any;
}

export interface FormConfig {
    name: string;
    fields: FieldConfig[];
    objects: ObjectConfig[];
    userId?: string;
}

interface DynamicFormProps {
    config: FormConfig;
    objects?: ObjectParameter[];
    onSubmitSuccess?: (
        successfulResponses: SuccessfulFormDataResponse[]
    ) => void;
    onSubmitError?: (error: any) => void;
}

interface ApiMethodConfig {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    params?: {
        [key: string]: string;
    };
}

type FormState = {
    [key: string]: string | number | boolean | string[] | null;
};

export interface SuccessfulFormDataResponse {
    name: string;
    data: any;
}

const getFieldContainerStyle = (columns: any, index: number, total: number) => {
    const margin = columns && index < total - 1 ? 10 : 0;
    const totalMargin = margin * (total - 1);
    const widthCorrection = columns ? totalMargin / total : 0;
    const adjustment = columns
        ? columns == 2
            ? -0.5
            : columns == 3
            ? 0.6
            : columns == 4
            ? 0.9
            : 0
        : 0;
    const widthPercent = columns ? 100 / columns : 100;
    const width = columns
        ? `${widthPercent + adjustment - widthCorrection}%`
        : '100%';

    return {
        width,
        ...styles.fieldContainer,
        marginRight: index < total - 1 ? margin : 0,
    };
};

function getNestedObject(nestedObj: any, pathArr: string[]) {
    return pathArr.reduce(
        (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
        nestedObj
    );
}

function DynamicForm({
    config,
    objects,
    onSubmitSuccess,
    onSubmitError,
}: DynamicFormProps) {
    const [formState, setFormState] = useState<FormState>({});
    const {user} = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (objects) {
                    objects.forEach((obj) => {
                        const data = obj.data;
                        updateFormStateWithData(data, obj.name);
                    });
                }

                setIsLoading(true);

                for (const obj of config.objects) {
                    // Skip if data for this object is already obtained from objects prop
                    if (objects?.some((o) => o.name === obj.name)) continue;

                    console.log('Fetched Data');
                    let data: any;

                    // Fetch data from the API
                    let fetchEndpoint = obj.apiConfig.fetch.endpoint;
                    if (obj?.apiConfig?.fetch?.params?.includeUserId) {
                        const userId = user?._id;
                        fetchEndpoint = `${fetchEndpoint}${userId}`;
                    }

                    const response = await privateApi.get(fetchEndpoint);
                    data = response.data;

                    // Update formState with the data
                    updateFormStateWithData(data, obj.name);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateFormStateWithData = (data: any, objectName: string) => {
        config.fields.forEach((field) => {
            if (field.details.type === 'group') {
                field.details.fields?.forEach((nestedField) => {
                    if (nestedField.databaseTarget?.object === objectName) {
                        const path = nestedField.databaseTarget.property;
                        const pathArr = path.split('.');
                        const value = getNestedObject(data, pathArr);
                        handleFieldChange(nestedField.name, value);
                    }
                });
            } else if (field.databaseTarget?.object === objectName) {
                const path = field.databaseTarget.property;
                const pathArr = path.split('.');
                const value = getNestedObject(data, pathArr);
                handleFieldChange(field.name, value);
            }
        });
    };

    const handleFieldChange = (
        fieldName: string,
        value: string | number | boolean | string[]
    ) => {
        setFormState((prevState) => ({...prevState, [fieldName]: value}));
    };

    const handleSubmit = async () => {
        try {
            const successfulResponses: SuccessfulFormDataResponse[] = [];

            for (const obj of config.objects) {
                const payload = {};

                config.fields.forEach((field) => {
                    if (field.details.type === 'group') {
                        field.details.fields?.forEach((nestedField) => {
                            if (
                                nestedField.databaseTarget?.object === obj.name
                            ) {
                                const path =
                                    nestedField.databaseTarget.property;
                                set(payload, path, formState[nestedField.name]);
                            }
                        });
                    } else if (field.databaseTarget?.object === obj.name) {
                        const path = field.databaseTarget.property;
                        set(payload, path, formState[field.name]);
                    }
                });

                // Construct the endpoint URL with userId if available
                let updateEndpoint = obj.apiConfig.update.endpoint;

                if (obj.apiConfig.update.params?.includeUserId) {
                    console.log('obj.apiConfig.update.params?.includeUserId');
                    console.log(updateEndpoint);
                    updateEndpoint = `${updateEndpoint}${user?._id}`;
                }
                console.log(updateEndpoint);

                // Determine the HTTP method to use and send the request
                const method = obj.apiConfig.update.method;
                if (method === 'PATCH') {
                    await privateApi.patch(updateEndpoint, payload);
                } else if (method === 'PUT') {
                    await privateApi.put(updateEndpoint, payload);
                } else if (method === 'POST') {
                    await privateApi.post(updateEndpoint, payload);
                }

                successfulResponses.push({name: obj.name, data: payload});
            }

            alert('Data updated successfully');
            console.log('successfulResponses');
            console.log(successfulResponses);
            onSubmitSuccess?.(successfulResponses);
        } catch (error) {
            console.error('Error updating data', error);
            alert('Error updating data');
            onSubmitError?.(error);
        }
    };

    const renderField = (fieldDetails: FieldDetails, fieldName: string) => {
        const fieldValue = formState[fieldName];
        switch (fieldDetails.type) {
            case 'input':
                return (
                    <FormInputField
                        key={fieldName}
                        {...fieldDetails}
                        value={fieldValue as string}
                        onChangeText={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            case 'checkbox':
                return (
                    <FormCheckboxField
                        key={fieldName}
                        {...fieldDetails}
                        onToggle={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            case 'dropdown':
                return (
                    <FormDropdownField
                        key={fieldName}
                        {...fieldDetails}
                        onOptionSelect={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            case 'image':
                return (
                    <FormImageField
                        key={fieldName}
                        {...fieldDetails}
                        onImageSelected={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            case 'multiselect':
                return (
                    <FormMultiselectField
                        key={fieldName}
                        {...fieldDetails}
                        onOptionsSelect={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            case 'radio':
                return (
                    <FormRadioField
                        key={fieldName}
                        {...fieldDetails}
                        onSelect={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            case 'toggle':
                return (
                    <FormToggleField
                        key={fieldName}
                        {...fieldDetails}
                        onToggle={(value) =>
                            handleFieldChange(fieldName, value)
                        }
                    />
                );
            default:
                return null;
        }
    };

    const groupedFields = config.fields.reduce(
        (acc: any, field: FieldConfig) => {
            const groupLabel = field.details.groupLabel || 'Ungrouped';
            if (!acc[groupLabel]) {
                acc[groupLabel] = [];
            }
            acc[groupLabel].push(field);
            return acc;
        },
        {}
    );

    const sections: Section[] = Object.entries(groupedFields).map(([groupLabel, fields]) => {
        return {
          title: groupLabel,
          data: fields as FieldItem[], // Here we are casting fields to FieldItem[]
        };
      });

      return (
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" /> // Show spinner while loading
          ) : (
            <SectionList
              style={styles.sectionList}
              sections={sections}
              stickySectionHeadersEnabled={true}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({ item, index, section }) => {
                const fieldStyle = getFieldContainerStyle(item.details.columns, index, section.data.length);
                if (item.details.type === 'group') {
                  return (
                    <View style={styles.row} key={item.name}>
                      {item.details.fields?.map((subField: any, subIndex: any, subArr: aany) => (
                        <View
                          style={getFieldContainerStyle(subField.details.columns, subIndex, subArr.length)}
                          key={subField.name}
                        >
                          {renderField(subField.details, subField.name)}
                        </View>
                      ))}
                    </View>
                  );
                }
                return (
                  <View style={fieldStyle} key={item.name}>
                    {renderField(item.details, item.name)}
                  </View>
                );
              }}
              renderSectionHeader={({ section: { title } }) => {
                if (!title) {
                  return null; // Return null instead of false when there is no title
                }
                
                return (
                    <Text style={styles.sectionHeader}>{title}</Text>
                );
              }}
              renderSectionFooter={() => <View style={styles.sectionFooter} />}
            />
          )}
          <View style={styles.submitButtonContainer}>
            <Button
              type={ButtonType.Fill}
              color={ButtonColor.Primary}
              label="Save Changes"
              onPress={handleSubmit}
              size={ButtonSize.Default}
              width={ButtonWidth.Full}
            />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    fieldContainer: {
        marginBottom: 10,
    },
    sectionList: {
        flex: 1,
      },
      sectionHeader: {
        backgroundColor: '#001a2b',
        paddingBottom:12,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14, 
      },
      row: {
        flexDirection: 'row',
        gap:5,
      },
    stickyLabel: {
        position: 'sticky',
        top: 0
    },
    sectionFooter: {
        height: 25, 
      },
    groupLabel: {
        fontSize: 14,
        marginBottom: 6,
        color: 'rgba(255,255,255,0.7)', // You might want to use a theme variable here
    },
    submitButtonContainer: {
        paddingTop: 20,
    },
});

export default DynamicForm;
