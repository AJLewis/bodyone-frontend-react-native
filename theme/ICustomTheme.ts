import { Theme as DefaultTheme } from "@react-navigation/native";
import designTokens from "designTokens";

type AdditionalColors = {
  tabBorder: string;
  headerBackground: string,
  premiumGold: string,
  darkGold: string,
  greenBackground: string,
  green: string;
  btnPrimary: string;
  btnSecondary: string;
  btnDisabled: string;
  lightFontFade: string;
  dropdownBackground: string;
}

type AdditionalFonts = {
  primary: string
}

type ConfigProperties = {
  name: string
}

// 2. Create a new type that extends the original Theme and merges the new colors
export interface CustomTheme extends Omit<DefaultTheme, 'colors'> {
  colors: DefaultTheme['colors'] & AdditionalColors;
}

export interface CustomTheme extends Omit<DefaultTheme, 'fonts'> {
  fonts: AdditionalFonts;
}

export interface CustomTheme extends Omit<DefaultTheme, 'properties'> {
  config: ConfigProperties;
}