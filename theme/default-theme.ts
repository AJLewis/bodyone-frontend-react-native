import { Theme } from "@react-navigation/native";
import designTokens from "../designTokens";

export const DefaultTheme: Theme = {
  dark: true,
  colors: {
    primary: designTokens.colors.primary500,
    background: designTokens.colors.primary700,
    card: designTokens.colors.primary600,
    text: designTokens.colors.lightFontDefault,
    border: designTokens.colors.tertiary400,
    notification: designTokens.colors.highlightRed,
  },
};