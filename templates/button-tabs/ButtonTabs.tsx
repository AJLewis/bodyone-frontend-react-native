import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonProps, ButtonType, ButtonColor, ButtonSize, ButtonWidth } from '../../components/button/Button'; // Assuming Button is in the same directory

interface ButtonTabsProps {
  tabs: Omit<ButtonProps, 'type' | 'color' | 'width'>[]; // Exclude 'type', 'color', and 'width' from individual tabs since we'll determine them based on active state
  activeTab: string; // This will be the label of the active tab
}

export const ButtonTabs: React.FC<ButtonTabsProps> = ({ tabs, activeTab }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs?.map((tab, index) => {
        const isActive = tab.label === activeTab;
        const type = isActive ? ButtonType.Fill : ButtonType.Outline;
        const color = isActive ? ButtonColor.Secondary : ButtonColor.Primary;

        return (
          <Button
            key={index}
            {...tab}
            type={type}
            color={color}
            size={ButtonSize.Small}
            width={ButtonWidth.Content} 
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:12
  },
});