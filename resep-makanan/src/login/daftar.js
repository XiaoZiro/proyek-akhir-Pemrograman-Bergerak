import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export default function Daftar({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [warning, setWarning] = useState('');

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setWarning('Semua field wajib diisi');
      return;
    }

    if (password !== confirmPassword) {
      setWarning('Password dan Konfirmasi Password tidak cocok');
      return;
    }

    try {
      const response = await axios.post('https://powerful-weasel-visually.ngrok-free.app/register', {
        email: email,
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response Data:', response.data);

      if (response.status === 201) {
        console.log('Data array:', response.data);
        navigation.navigate('login');
        await AsyncStorage.setItem("iduser", response.data.id);
      } else {
        setWarning('Registrasi gagal, silakan coba lagi');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error('Response Error:', error.response.data);
        setWarning('Registrasi gagal, silakan coba lagi');
      } else if (error.request) {
        console.error('Request Error:', error.request);
        setWarning('Tidak dapat terhubung ke server, silakan coba lagi.');
      } else {
        console.error('Axios Error:', error.message);
        setWarning('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Image
            style={styles.gambarlogo}
            source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/30fa22516d4e24feefa4eaebdb079650" }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.ulogin}>
        <Text style={styles.txtlogin}>REGISTER</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="Email"
          placeholderTextColor='grey'
          onChangeText={setEmail}
          value={email}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.txtinput}
          placeholder="Username"
          placeholderTextColor='grey'
          onChangeText={setUsername}
          value={username}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.txtinput}
          placeholder="Password"
          placeholderTextColor='grey'
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.txtinput}
          placeholder="Confirm Password"
          placeholderTextColor='grey'
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
        {warning ? <Text style={styles.warning}>{warning}</Text> : null}
      </View>

      <View style={styles.btnlogin}>
        <TouchableOpacity style={styles.touchable} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  txtlogin: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 20,
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  ulogin: {
    marginTop: 30,
  },
  txtinput: {
    borderColor: 'grey',
    borderBottomWidth: 2,
    height: 40,
    marginHorizontal: 20,
    padding: 10,
    marginTop: 20,
    color: 'black',
  },
  btnlogin: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 194,
    height: 38,
    borderRadius: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gambarlogo: {
    height: 35,
    width: 30,
    marginLeft: 20,
    marginTop: 60,
  },
  warning: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});
