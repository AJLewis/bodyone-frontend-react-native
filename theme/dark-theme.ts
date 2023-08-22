import { Theme } from "@react-navigation/native";
import designTokens from "../designTokens";
import { CustomTheme } from "./ICustomTheme";

export const DarkTheme: CustomTheme = {
  
  dark: true,
  colors: {
    primary: designTokens.colors.primary500,
    background: designTokens.colors.tertiary600,
    card: designTokens.colors.tertiary400,
    dropdownBackground: designTokens.colors.tertiary500,
    text: designTokens.colors.lightFontDefault,
    border: designTokens.colors.tertiary400,
    notification: designTokens.colors.highlightRed,
    tabBorder: designTokens.colors.tertiary400,
    headerBackground: designTokens.colors.tertiary400,
    premiumGold: designTokens.colors.highlightPremium,
    darkGold: designTokens.colors.highlightPts,
    greenBackground: designTokens.colors.backgroundGreen,
    green: designTokens.colors.highlightGreen,
    btnPrimary: designTokens.colors.primary400,
    btnSecondary: designTokens.colors.secondary400,
    btnDisabled: designTokens.colors.darkFontDefault,
    lightFontFade: designTokens.colors.lightFontFade,
    tabsBackground: designTokens.colors.tertiary400,
    tabSelected: designTokens.colors.secondary400,
    highlightedTab: designTokens.colors.primary300,
    menuDividerColor: designTokens.colors.tertiary400,
    cardDividerColor: designTokens.colors.lightFontDefault,
    notificationBackgroundViewed: designTokens.colors.tertiary500,
    notificationBackgroundUnviewed: designTokens.colors.tertiary400, 
    notificationIconBackgroundViewed: designTokens.colors.primary500, 
    notificationIconBackgroundUnviewed: designTokens.colors.secondary400,
    logoutBackground: designTokens.colors.tertiary500,
  },
  fonts: {
    primary: designTokens.fonts.primary
  },
  config: {
    name: 'default'
  }
};