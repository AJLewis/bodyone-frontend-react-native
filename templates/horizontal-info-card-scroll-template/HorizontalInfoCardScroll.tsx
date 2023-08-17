import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, LayoutChangeEvent } from 'react-native';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useTheme } from '@react-navigation/native';
import InfoCard from '../../components/info-card/InfoCard'; // Adjust the path as needed
import { InfoCardProps } from 'components/info-card/InfoCard';

interface HorizontalInfoCardScrollProps {
  title: string;
  cardsData: InfoCardProps[]; // An array of InfoCardProps to render each InfoCard
}

export function HorizontalInfoCardScroll({ title, cardsData }: HorizontalInfoCardScrollProps) {
  const { colors } = useTheme() as CustomTheme;
  const [maxHeight, setMaxHeight] = useState(190);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cardsData.map((card, index) => (
          <View style={{ ...styles.infoCard, height: maxHeight }} key={index}>
            <InfoCard {...card} cardHeight={maxHeight} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  infoCard: {
    marginLeft: 20,
  },
  lastCardStyle: {
    marginRight: 20,
  },
  title: {
    marginLeft:20,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
});

export default HorizontalInfoCardScroll;