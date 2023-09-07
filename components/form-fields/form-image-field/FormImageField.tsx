import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';
import * as ImagePicker from 'expo-image-picker';

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
  const { colors } = useTheme() as CustomTheme;
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
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Tap to select an image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 100,
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 21,
    marginBottom: 5,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  placeholder: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default FormImageField;