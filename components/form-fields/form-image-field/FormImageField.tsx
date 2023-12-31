import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../../contexts/UserContext';

interface FormImageFieldProps {
  label?: string;
  onImageSelected?: (imageUri: string) => void;
  mediaType?: 'photo' | 'video' | 'mixed';
}

export function FormImageField({
  label = "Select an Image",
  onImageSelected,
  mediaType = 'photo',
}: FormImageFieldProps) {
  const { theme } = useUser();
  const { colors } = theme as CustomTheme;
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePicker = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType === 'mixed' ? ImagePicker.MediaTypeOptions.All : (mediaType === 'photo' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos),
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      onImageSelected && onImageSelected(result.uri);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      <TouchableOpacity onPress={handleImagePicker} style={[styles.imageContainer, {backgroundColor: colors.fieldBackground}]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={[styles.placeholder, {color: colors.lightFontFade}]}>{'Tap to select an image'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 100,
  },
  label: {
    fontSize: 12,
    lineHeight: 21,
    marginBottom: 5,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  placeholder: {
    fontSize: 14,
  },
});

export default FormImageField;