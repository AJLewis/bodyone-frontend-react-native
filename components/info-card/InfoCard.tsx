import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, LayoutChangeEvent } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useTheme } from '@react-navigation/native';

export interface InfoCardProps {
  title: string;
  data: { title: string; value: string }[];
  imageSource: any;
  iconName: any;
  rightIconName?: any;
  dataTitle: any;
  fixedSize?: number;
  onLayout?: (event: LayoutChangeEvent) => void; 
  cardHeight?: number; 
}

export function InfoCard({ title, data, imageSource, iconName, rightIconName = 'options', dataTitle, fixedSize, onLayout, cardHeight }: InfoCardProps) {
  const { colors } = useTheme() as CustomTheme;
  
  return (
    <View style={{ ...styles.root, height: cardHeight, backgroundColor: colors.card, width : fixedSize }}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <MaterialCommunityIcons name={iconName} size={20} color={colors.text} />
          <Text style={{...styles.title, color: colors.text, marginLeft: 5 }}>{title}</Text>
        </View>
        <Ionicons name={rightIconName} size={24} color={colors.text}/>

      </View>
      <View style={styles.line} />
      <View style={{...styles.content}}>
        <Image source={imageSource} style={{ ...styles.image, borderColor: colors.text }} />
        <View>
          <Text numberOfLines={2} ellipsizeMode='tail' style={{...styles.dataTitle, color: colors.text,}}>{dataTitle}</Text>
          {data.map((item, index) => (
            <View key={index} style={styles.dataItem}>
              <Text style={{ ...styles.dataKey, color: colors.text }}>{item.title}</Text>
              <Text style={{ ...styles.dataValue, color: colors.text }}>{item.value}</Text>
            </View>
  ))}
        </View>
      </View>
    </View>
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
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  content: {
    marginTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth:130
  },
  dataTitle: {
    fontWeight: 'bold',
    marginBottom:8,
    lineHeight: 20
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

export default InfoCard