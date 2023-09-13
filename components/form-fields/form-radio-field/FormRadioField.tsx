import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../../theme/ICustomTheme';
import {useUser} from '../../../contexts/UserContext';

interface FormRadioFieldProps {
    label?: string;
    options: {label: string; value: any}[];
    initialSelected?: any;
    onSelect?: (value: any) => void;
}

export function FormRadioField({
    label = 'Choose an option',
    options,
    initialSelected = null,
    onSelect,
}: FormRadioFieldProps) {
    const {theme} = useUser();
    const {colors} = theme as CustomTheme;
    const [selectedOption, setSelectedOption] = useState(initialSelected);

    const handleSelect = (value: any) => {
        setSelectedOption(value);
        onSelect && onSelect(value);
    };

    return (
        <View style={styles.root}>
            <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <View
                        key={option.value}
                        style={styles.optionContainer}
                    >
                        <TouchableOpacity
                            onPress={() => handleSelect(option.value)}
                            style={styles.container}
                        >
                            <View
                                style={[
                                    styles.radio,
                                    {borderColor: colors.border},
                                    selectedOption === option.value && {
                                        borderColor: colors.btnSecondary,
                                    },
                                ]}
                            >
                                {selectedOption === option.value && (
                                    <View
                                        style={[
                                            styles.innerCircle,
                                            {
                                                backgroundColor:
                                                    colors.btnSecondary,
                                            },
                                        ]}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={[styles.optionLabel, {color: colors.text}]}
                        >
                            {option.label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    container: {
        marginRight: 5,
    },
    radio: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 12.5, // Half of width/height to make it a circle
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 15,
        height: 15,
        borderRadius: 7.5, // Half of width/height to make it a circle
    },
    label: {
        fontSize: 12,
        lineHeight: 21,
        marginRight: 10,
    },
    optionLabel: {
        marginLeft:5,
        fontSize: 14,
    },
});
export default FormRadioField;
