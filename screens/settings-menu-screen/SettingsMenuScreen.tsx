import React, {useRef, useState} from 'react';
import SlideMenuWithButtonNavigation from '../../templates/slide-in-with-button-navigation/SlideMenuWithButtonNavigation';
import { useMenu } from '../../contexts/UseMenuContext';
import { View, Text } from 'react-native';
import DynamicForm, { FormConfig } from '../../components/dynamic-form/DynamicForm';

const SettingsMenuScreen = () => {
    const settingsMenuRef = useRef<{closeMenu: () => void} | null>(null);
    const {setSettingsVisible} = useMenu();

  const formConfigObject: FormConfig = {
      name: 'UserProfileForm',
      fields: [
          {
              name: 'firstName',
              details: {
                  type: 'input',
                  label: 'First Name',
                  placeholder: 'Enter your first name',
                  inputType: 'text',
                  groupLabel: 'Profile Information',
              },
              databaseTarget: {
                  database: 'userDatabase',
                  object: 'userProfile',
                  property: 'firstName',
              },
          },
          {
              name: 'lastName',
              details: {
                  type: 'input',
                  label: 'Last Name',
                  placeholder: 'Enter your last name',
                  inputType: 'text',
                  groupLabel: 'Profile Information',
              },
              databaseTarget: {
                  database: 'userDatabase',
                  object: 'userProfile',
                  property: 'lastName',
              },
          },
          {
              name: 'email',
              details: {
                  type: 'input',
                  label: 'Email',
                  placeholder: 'Enter your email',
                  inputType: 'text',
                  groupLabel: 'Profile Information',
              },
              databaseTarget: {
                  database: 'userDatabase',
                  object: 'userProfile',
                  property: 'email',
              },
          },
      ],
  };
  
  const objects = {
      userDatabase: {
          userProfile: {},
      },
  };
  
    const settingsChildren = [
      {
          component: (
              <View style={{flex:1, paddingHorizontal:20, paddingTop: 20, paddingBottom: 30}}>
                  <DynamicForm
                      config={formConfigObject}
                      objects={objects}
                  />
              </View>
          ),
          tabName: 'Personal',
      },
      {
          component: (
              <View>
                  <Text>Settings</Text>
              </View>
          ),
          tabName: 'Settings',
      },
  ];

    return (
        <SlideMenuWithButtonNavigation
            ref={settingsMenuRef}
            activeTab="Personal"
            onClose={() => setSettingsVisible(false)}
            children={settingsChildren}
        />
    );
};

export default SettingsMenuScreen;
