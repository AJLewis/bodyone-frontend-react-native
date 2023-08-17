import { Theme as DefaultTheme } from "@react-navigation/native";
import designTokens from "designTokens";

type AdditionalColors = {
  tabBorder: string;
  headerBackground: string,
  premiumGold: string,
  darkGold: string,
  greenBackground: string,
  green: string;
};

// 2. Create a new type that extends the original Theme and merges the new colors
export interface CustomTheme extends Omit<DefaultTheme, 'colors'> {
  colors: DefaultTheme['colors'] & AdditionalColors;
}