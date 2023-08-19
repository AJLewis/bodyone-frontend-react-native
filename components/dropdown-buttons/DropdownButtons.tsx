import { useTheme } from "@react-navigation/native";
import { Button, ButtonSize, ButtonType } from "../button/Button";
import { View, StyleSheet } from "react-native";
import { CustomTheme } from "theme/ICustomTheme";

interface DropdownButtonProps {
  buttons: { label: string; onPress: () => void }[];
  isVisible: boolean;
}

export const DropdownButtons: React.FC<DropdownButtonProps> = ({ buttons, isVisible }) => {
  if (!isVisible) return null;
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={{...styles.dropdownContainer, backgroundColor: colors.dropdownBackground}}>
      {buttons.map((button, index) => (
        <View style={styles.button} key={index}>
          <Button size={ButtonSize.Small} type={ButtonType.Outline} label={button.label} onPress={button.onPress} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical:5
  },
  dropdownContainer: {
    position: 'absolute',
    padding: 10,
    right: 15,
    top: 40, // Adjust based on the size of the icon
    backgroundColor: 'white',
    borderRadius: 10,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 999
  },
});