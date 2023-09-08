import React, {useEffect, useRef, useState} from 'react';
import SlideMenuWithButtonNavigation from '../../templates/slide-in-with-button-navigation/SlideMenuWithButtonNavigation';
import {useMenu} from '../../contexts/UseMenuContext';
import {View, Text, StyleSheet} from 'react-native';
import DynamicForm, {
    FormConfig, SuccessfulFormDataResponse,
} from '../../components/dynamic-form/DynamicForm';
import { IUser, useUser } from '../../contexts/UserContext';
import FormToggleField from '../../components/form-fields/form-toggle-field/FormToggleField';

const SettingsMenuScreen = () => {
    const settingsMenuRef = useRef<{closeMenu: () => void} | null>(null);
    const { setSettingsVisible, personalSettingsMenu } = useMenu();
    const { user, setUser } = useUser();
    const [ isShowComplete, setIsShowComplete ] = useState(false);
    const [ showDynamicForm, setShowDynamicForm ] = useState(false);

    const updateUser = (payloads: SuccessfulFormDataResponse[]) => {
      let userData = payloads.find((x:any) => x.name === 'userProfile');
      if(userData) {
        userData.data._id = user?._id;
        setUser(userData.data)
      }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowDynamicForm(true);
        }, 0);
    
        // Cleanup the timer when the component is unmounted
        return () => {
          clearTimeout(timer);
        };
      }, []);

    const showUncomplete = ( ) => { setIsShowComplete((prevState) => (!prevState)); };

    const settingsChildren = [
        {
            component: (
                <View>
                    <Text>Settings</Text>
                </View>
            ),
            tabName: 'Settings',
        },
        {
            component: (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        paddingBottom: 30,
                    }}
                >
                    {/* @ts-ignore */}
                    <View style={styles.options}>
                    <FormToggleField
                        label='Show Incomplete Settings'
                        isToggled={isShowComplete}
                        onToggle={(value) =>
                            showUncomplete()
                        }
                    />
                    </View>
                    {showDynamicForm && (
                        <DynamicForm
                        config={personalSettingsMenu}
                        objects={[{ name: 'userProfile', data: user }]}
                        onSubmitSuccess={updateUser}
                        />
                    )}
                </View>
            ),
            tabName: 'Personal',
        },
        {
            component: (
                <View>
                    <Text>Goals</Text>
                </View>
            ),
            tabName: 'Goals',
        }
    ];

    return (
        <SlideMenuWithButtonNavigation
            ref={settingsMenuRef}
            activeTab="Settings"
            onClose={() => setSettingsVisible(false)}
            children={settingsChildren}
        />
    );
};

const styles = StyleSheet.create({
    options: {
        marginBottom: 15
    }
})

export default SettingsMenuScreen;
