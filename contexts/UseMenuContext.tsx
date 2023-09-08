import {FormConfig} from 'components/dynamic-form/DynamicForm';
import React, {createContext, useContext, useState, ReactNode} from 'react';

interface MenuItem {
    id: number;
    name: string;
    route: string;
}

interface MenuContextType {
    slideInNavigation: MenuItem[];
    setSlideInNavigation: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    isMenuVisible: boolean;
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isNotificationsMenuVisible: boolean;
    setNotificationsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isSettingsVisible: boolean;
    setSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    personalSettingsMenu: FormConfig;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = (): MenuContextType => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};

interface MenuProviderProps {
    children: ReactNode;
}

const formConfigObject: FormConfig = {
    name: 'UserProfileForm',
    objects: [
        {
            name: 'userProfile',
            apiConfig: {
                fetch: {
                    endpoint: '/user/basic/',
                    method: 'GET',
                    params: {
                        includeUserId: true,
                    },
                },
                update: {
                    endpoint: 'user/',
                    method: 'PATCH',
                    params: {
                        includeUserId: true,
                    },
                },
            },
        },
    ],
    fields: [
        {
            name: 'workHours',
            details: {
                groupLabel: 'Lifestyle',
                type: 'group',
                fields: [
                    {
                        name: 'workHours',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'personalLife.workHours',
                        },
                        details: {
                            columns: 2,
                            groupLabel: 'Lifestyle',
                            inputType: 'number',
                            label: 'Work Hours (hrs)',
                            placeholder: 'Enter your work hours per week',
                            type: 'input',
                        },
                    },
                    {
                        name: 'commuteTime',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'personalLife.commuteTime',
                        },
                        details: {
                            columns: 2,
                            groupLabel: 'Lifestyle',
                            inputType: 'number',
                            label: 'Commute Time (hrs)',
                            placeholder:
                                'Enter your average commute time in minutes',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'homeLife',
            details: {
                groupLabel: 'Lifestyle',
                type: 'group',
                fields: [
                    {
                        name: 'pets',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'personalLife.pets',
                        },
                        details: {
                            columns: 2,
                            groupLabel: 'Lifestyle',
                            label: 'Pets',
                            placeholder: 'Select the types of pets you have',
                            type: 'input',
                            options: [
                                'Dog',
                                'Cat',
                                'Bird',
                                'Fish',
                                'Reptile',
                                'Other',
                            ], // Add more options as necessary
                        },
                    },
                    {
                        name: 'hobbies',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'personalLife.hobbies',
                        },
                        details: {
                            columns: 2,
                            groupLabel: 'Lifestyle',
                            label: 'Hobbies',
                            placeholder: 'Select your hobbies',
                            type: 'input',
                            options: [
                                'Reading',
                                'Gaming',
                                'Cooking',
                                'Sports',
                                'Music',
                                'Art',
                                'Other',
                            ], // Add more options as necessary
                        },
                    },
                ],
            },
        },
        {
          name: 'family',
          databaseTarget: {
              database: 'userDatabase',
              object: 'userProfile',
              property: 'personalLife.family',
          },
          details: {
              groupLabel: 'Lifestyle',
              label: 'Family',
              type: 'group',
              fields: [
                  {
                      name: 'spouse',
                      databaseTarget: {
                          database: 'userDatabase',
                          object: 'userProfile',
                          property: 'personalLife.family.spouse',
                      },
                      details: {
                        columns: 2,
                          inputType: 'text',
                          label: 'Spouse',
                          placeholder: 'Do you have a spouse?',
                          type: 'input',
                      },
                  },
                  {
                      name: 'children',
                      databaseTarget: {
                          database: 'userDatabase',
                          object: 'userProfile',
                          property:
                              'personalLife.family.children',
                      },
                      details: {
                        columns: 2,
                          inputType: 'number',
                          label: 'Number of Children',
                          placeholder:
                              'Enter the number of children you have',
                          type: 'input',
                      },
                  },
              ],
          },
      },
        {
            name: 'weightHeight',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'weight',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.weight',
                        },
                        details: {
                            groupLabel: 'Physical Metrics',
                            inputType: 'number',
                            label: 'Weight (cm)',
                            columns: 2,
                            placeholder: 'Enter your weight in kg',
                            type: 'input',
                        },
                    },
                    {
                        name: 'height',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.height',
                        },
                        details: {
                            groupLabel: 'Physical Metrics',
                            inputType: 'number',
                            label: 'Height (cm)',
                            columns: 2,
                            placeholder: 'Enter your height in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'waistChest',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'waist',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.waist',
                        },
                        details: {
                            groupLabel: 'Physical Metrics',
                            inputType: 'number',
                            label: 'Waist (cm)',
                            columns: 2,
                            placeholder: 'Enter your waist measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'chest',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.chest',
                        },
                        details: {
                            groupLabel: 'Physical Metrics',
                            inputType: 'number',
                            label: 'Chest (cm)',
                            columns: 2,
                            placeholder: 'Enter your chest measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'hipsNeck',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'hips',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.hips',
                        },
                        details: {
                            groupLabel: 'Physical Metrics',
                            inputType: 'number',
                            label: 'Hips (cm)',
                            columns: 2,
                            placeholder: 'Enter your hips measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'neck',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.neck',
                        },
                        details: {
                            groupLabel: 'Physical Metrics',
                            inputType: 'number',
                            label: 'Neck (cm)',
                            columns: 2,
                            placeholder: 'Enter your neck measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'biceps',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'leftBicep',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.biceps.left',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Left Bicep (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your left bicep measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'rightBicep',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.biceps.right',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Right Bicep (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your right bicep measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'forearms',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'leftForearm',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.forearms.left',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Left Forearm (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your left forearm measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'rightForearm',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.forearms.right',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Right Forearm (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your right forearm measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'wrists',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'leftWrist',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.wrists.left',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Left Wrist (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your left wrist measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'rightWrist',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.wrists.right',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Right Wrist (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your right wrist measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'thighs',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'leftThigh',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.thighs.left',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Left Thigh (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your left thigh measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'rightThigh',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.thighs.right',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Right Thigh (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your right thigh measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'calves',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'leftCalf',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.calves.left',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Left Calf (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your left calf measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'rightCalf',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.calves.right',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Right Calf (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your right calf measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'ankles',
            details: {
                groupLabel: 'Physical Metrics',
                type: 'group',
                fields: [
                    {
                        name: 'leftAnkle',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.ankles.left',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Left Ankle (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your left ankle measurement in cm',
                            type: 'input',
                        },
                    },
                    {
                        name: 'rightAnkle',
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'metrics.bodyMeasurements.ankles.right',
                        },
                        details: {
                            inputType: 'number',
                            label: 'Right Ankle (cm)',
                            columns: 2,
                            placeholder:
                                'Enter your right ankle measurement in cm',
                            type: 'input',
                        },
                    },
                ],
            },
        },
        {
            name: 'dietaryPreferences',
            databaseTarget: {
                database: 'userDatabase',
                object: 'userProfile',
                property: 'diet.dietaryPreferences',
            },
            details: {
                groupLabel: 'Diet and Cooking',
                label: 'Dietary Preferences',
                placeholder: 'Select your dietary preferences',
                type: 'input',
            },
        },
        {
            name: 'fitnessLevel',
            databaseTarget: {
                database: 'userDatabase',
                object: 'userProfile',
                property: 'exercise.fitnessLevel',
            },
            details: {
                groupLabel: 'Fitness',
                label: 'Fitness Level',
                placeholder: 'Select your fitness level',
                type: 'input',
            },
        },
    ],
};

export const MenuProvider: React.FC<MenuProviderProps> = ({children}) => {
    const [slideInNavigation, setSlideInNavigation] = useState<MenuItem[]>([]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const [isNotificationsMenuVisible, setNotificationsMenuVisible] =
        useState<boolean>(false);
    const [isSettingsVisible, setSettingsVisible] = useState<boolean>(false);
    const [personalSettingsMenu] = useState<FormConfig>(formConfigObject);

    return (
        <MenuContext.Provider
            value={{
                slideInNavigation,
                setSlideInNavigation,
                isMenuVisible,
                setMenuVisible,
                isNotificationsMenuVisible,
                setNotificationsMenuVisible,
                isSettingsVisible,
                setSettingsVisible,
                personalSettingsMenu,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};
