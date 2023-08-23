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


export type IconLibraryType = 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Fontisto' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial';

type IconComponentProps = {
  name: any;
  library: IconLibraryType,
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}; 

const IconComponent: React.FC<IconComponentProps> = ({ name, library, size = 24, color = '#000', style, onPress }) => {
  switch (library) {
    case 'AntDesign':
      return <AntDesign onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Entypo':
      return <Entypo onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'EvilIcons':
      return <EvilIcons onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Feather':
      return <Feather onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'FontAwesome':
      return <FontAwesome onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'FontAwesome5':
      return <FontAwesome5 onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Fontisto':
      return <Fontisto onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Foundation':
      return <Foundation onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Ionicons':
      return <Ionicons onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'MaterialIcons':
      return <MaterialIcons onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Octicons':
      return <Octicons onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons onPress={onPress} name={name} size={size} color={color} style={style} />;
    case 'Zocial':
      return <Zocial onPress={onPress} name={name} size={size} color={color} style={style} />;
    default:
      return null;
  }
};

export default IconComponent;