import { Theme } from "@react-navigation/native";
import designTokens from "../designTokens";
import { CustomTheme } from "./ICustomTheme";

export const DarkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: designTokens.colors.primary500,
    background: designTokens.colors.tertiary600,
    card: designTokens.colors.tertiary600,
    text: designTokens.colors.lightFontDefault,
    border: designTokens.colors.tertiary400,
    notification: designTokens.colors.highlightRed,
    tabBorder: designTokens.colors.tertiary400,
    headerBackground: designTokens.colors.tertiary400
  }
};