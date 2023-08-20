import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from 'theme/ICustomTheme';

export function PremiumBannerOrganism() {
  
  const colorScheme = useColorScheme();
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={[styles.root, { backgroundColor: colors.greenBackground }]}>
      <View style={styles.frame710}>
        <MaterialCommunityIcons name="crown" size={25} color={colors.premiumGold} style={styles.mdiCrown} />
        <Text style={[styles.startPremiumTrialTodayNoCardRequired, { color: colors.text }]}>
          START PREMIUM TRIAL TODAY - NO CARD REQUIRED
        </Text>
        <MaterialCommunityIcons name="crown" size={25} color={colors.premiumGold} style={styles.mdiCrown2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mdiCrown: {
    position: 'absolute',
    left: 15,
  },
  startPremiumTrialTodayNoCardRequired: {
    fontSize: 13,
    fontStyle: 'normal',
    width: '100%',
    fontWeight: '700',
    textAlign: 'center',
  },
  mdiCrown2: {
    position: 'absolute',
    right: 15,
  },
  frame710: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
});