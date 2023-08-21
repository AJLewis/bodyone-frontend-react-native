import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, LayoutChangeEvent, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useTheme } from '@react-navigation/native';
import {DropdownButtons} from '../dropdown-buttons/DropdownButtons';
import { Button } from '../button/Button'; // Adjust the path as needed
import { useUser } from '../../contexts/UserContext';

export interface InfoCardProps {
  type: string; // Added this
  title: string;
  data: { title: string; value: string }[];
  imageSource: any;
  iconName: any;
  rightIconName?: any;
  dataTitle: any;
  fixedSize?: number;
  onLayout?: (event: LayoutChangeEvent) => void; 
  cardHeight?: number; 
  actions: any
}

export function InfoCard({ type, title, data, imageSource, iconName, rightIconName = 'options', dataTitle, fixedSize, onLayout, cardHeight , actions}: InfoCardProps) {
  const { theme } = useUser();
  const { colors } = theme as CustomTheme;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
      <View style={{ ...styles.root, height: cardHeight, backgroundColor: colors.card, width: fixedSize }}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <MaterialCommunityIcons name={iconName} size={20} color={colors.text} />
            <Text style={{ ...styles.title, color: colors.text, marginLeft: 5 }}>{title}</Text>
          </View>
          <Ionicons 
            name={rightIconName} 
            size={24} 
            color={!isDropdownVisible ? colors.text : colors.primary} 
            onPress={() => setDropdownVisible(!isDropdownVisible)} // Toggle dropdown visibility
          />
        </View>
        <View style={{...styles.line, backgroundColor: colors.menuDividerColor }} />
        <View style={{ ...styles.content }}>
          <Image source={imageSource} style={{ ...styles.image, borderColor: colors.text }} />
          <View>
            <Text numberOfLines={2} ellipsizeMode='tail' style={{ ...styles.dataTitle, color: colors.text }}>{dataTitle}</Text>
            {data.map((item, index) => (
              <View key={index} style={styles.dataItem}>
                <Text style={{ ...styles.dataKey, color: colors.text }}>{item.title}</Text>
                <Text style={{ ...styles.dataValue, color: colors.text }}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
        <DropdownButtons isVisible={isDropdownVisible} buttons={actions} />
      </View>
    </TouchableWithoutFeedback>
  );
}




const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 18,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    marginVertical: 10,
  },
  content: {
    marginTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth:130
  },
  dataTitle: {
    marginBottom:8,
    lineHeight: 18
  },
  dataKey: {
    marginBottom: 2,
    marginRight:4,
    fontSize: 12
  },
  dataContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  dataItem: {
    flexDirection: 'row',
  },
  dataValue: {
    fontWeight: 'bold',
    fontSize: 12
  },
  image: {
    width: 97,
    height: 97,
    marginRight: 20,
    borderRadius: 48.5, // Half of the width and height to make it a circle
    borderWidth: 1,
  },
});

export default InfoCard;