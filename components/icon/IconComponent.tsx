import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from '@expo/vector-icons';

type IconComponentProps = {
  name: any;
  library: 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Fontisto' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial';
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const IconComponent: React.FC<IconComponentProps> = ({ name, library, size = 24, color = '#000', style }) => {
  switch (library) {
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} style={style} />;
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} style={style} />;
    case 'EvilIcons':
      return <EvilIcons name={name} size={size} color={color} style={style} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} style={style} />;
    case 'FontAwesome':
      return <FontAwesome name={name} size={size} color={color} style={style} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} style={style} />;
    case 'Fontisto':
      return <Fontisto name={name} size={size} color={color} style={style} />;
    case 'Foundation':
      return <Foundation name={name} size={size} color={color} style={style} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} style={style} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />;
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} style={style} />;
    case 'Octicons':
      return <Octicons name={name} size={size} color={color} style={style} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={name} size={size} color={color} style={style} />;
    case 'Zocial':
      return <Zocial name={name} size={size} color={color} style={style} />;
    default:
      return null;
  }
};

export default IconComponent;