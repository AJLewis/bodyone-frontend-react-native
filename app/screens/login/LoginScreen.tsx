import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { login } from '../../../services/AuthService';

// @ts-ignore
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.navigate('index');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <View style={styles.container}>
      // Logo here
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text>{error}</Text>}
      <Text style={styles.forgotPassword}>Forgotten Password?</Text>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up for Free" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    // Style as needed
  },
});

export default LoginScreen;