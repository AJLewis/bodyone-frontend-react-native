import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, LayoutChangeEvent } from 'react-native';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useTheme } from '@react-navigation/native';
import InfoCard from '../../components/info-card/InfoCard'; // Adjust the path as needed
import { InfoCardProps } from 'components/info-card/InfoCard';
import { useUser } from '../../contexts/UserContext';

interface HorizontalInfoCardScrollProps {
  title: string;
  cardsData: InfoCardProps[]; // An array of InfoCardProps to render each InfoCard
}

export function HorizontalInfoCardScroll({ title, cardsData }: HorizontalInfoCardScrollProps) {
  const { theme } = useUser();
  const { colors, fonts } = theme as CustomTheme;
  const [maxHeight, setMaxHeight] = useState(180);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: colors.text, fontFamily: fonts?.primary }}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cardsData.map((card, index) => (
          <View style={[
            styles.infoCard, 
            { height: maxHeight }, 
            index === cardsData.length - 1 ? styles.lastCardStyle : {}
          ]} 
          key={index}>
            <InfoCard {...card} cardHeight={maxHeight} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  infoCard: {
    marginLeft: 20,
  },
  lastCardStyle: {
    marginRight: 20,
  },
  title: {
    marginLeft:20,
    fontSize: 16,
    marginBottom: 10,
    opacity: 0.7
  },
});

export default HorizontalInfoCardScroll;