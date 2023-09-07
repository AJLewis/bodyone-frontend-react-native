import React, {useState} from 'react';
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
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {set} from 'lodash';
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

export interface FormConfig {
    name: string;
    fields: FieldConfig[];
}

interface DynamicFormProps {
    config: FormConfig;
    objects: any; // You might want to replace this with a more specific type based on your data structure
}

type FormState = {
    [key: string]: string | number | boolean | string[] | null;
};

const getFieldContainerStyle = (columns: any, index: number, total: number) => {
    const margin = columns && index < total - 1 ? 10 : 0;
    const totalMargin = margin * (total - 1);
    const widthCorrection = columns ? totalMargin / total : 0;
    const adjustment = columns ? columns == 2 ? 0.3 : columns == 3 ? 0.6 : columns == 4 ? 0.9 : 0 : 0;
    const widthPercent = columns ? 100 / columns : 100;
    const width = columns ? `${widthPercent + adjustment - widthCorrection}%` : '100%';

    return {
        width,
        ...styles.fieldContainer,
        marginRight: index < total - 1 ? margin : 0,
    };
};

function DynamicForm({config, objects}: DynamicFormProps) {
    const [formState, setFormState] = useState<FormState>({});

    const handleFieldChange = (
        fieldName: string,
        value: string | number | boolean | string[]
    ) => {
        setFormState((prevState) => ({...prevState, [fieldName]: value}));
    };

    const handleSubmit = () => {
        const payloads = {};

        config.fields.forEach((field: FieldConfig) => {
            const target = field.databaseTarget;
            const path = `${target.database}.${target.object}.${target.property}`;
            set(payloads, path, (formState as FormState)[field.name]);
        });
    };

    const renderField = (fieldDetails: FieldDetails, fieldName: string) => {
        switch (fieldDetails.type) {
            case 'input':
                return (
                    <FormInputField
                        key={fieldName}
                        {...fieldDetails}
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

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {Object.entries(groupedFields).map(([groupLabel, fields]) => (
                    <View
                        key={groupLabel}
                        style={styles.groupContainer}
                    >
                        {groupLabel !== 'Ungrouped' && (
                            <Text style={styles.groupLabel}>{groupLabel}</Text>
                        )}
                        {(fields as FieldConfig[]).map((field, index, arr) => {
                            const fieldStyle = getFieldContainerStyle(
                                field.details.columns,
                                index,
                                arr.length
                            );
                            if (field.details.type === 'group') {
                                return (
                                    <View
                                        style={{flexDirection: 'row', gap: 10}}
                                        key={field.name}
                                    >
                                        {field.details.fields?.map(
                                            (subField, subIndex, subArr) => (
                                                <View
                                                    style={getFieldContainerStyle(
                                                        subField.details
                                                            .columns,
                                                        subIndex,
                                                        subArr.length
                                                    )}
                                                    key={subField.name}
                                                >
                                                    {renderField(
                                                        subField.details,
                                                        subField.name
                                                    )}
                                                </View>
                                            )
                                        )}
                                    </View>
                                );
                            }
                            return (
                                <View
                                    style={fieldStyle}
                                    key={field.name}
                                >
                                    {renderField(field.details, field.name)}
                                </View>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>
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
      marginVertical: 7,
  },
  groupContainer: {
      marginBottom: 25,
  },
  groupLabel: {
      fontSize: 14,
      marginBottom: 6,
      color: 'rgba(255,255,255,0.7)', // You might want to use a theme variable here
  },
  submitButtonContainer: {
    paddingTop:20
  },
});

export default DynamicForm;
