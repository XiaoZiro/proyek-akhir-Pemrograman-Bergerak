import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const result = await axios.get('https://powerful-weasel-visually.ngrok-free.app/users');
      console.log(result.data); // Log the response data
      setUsers(result.data.data); // Adjust this line to set users correctly
    } catch (error) {
      console.error('Failed to Fetch User', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async () => {
    if (!gmail || !password) {
      setWarning('Email atau Password wajib di isi');
      return;
    }

    const user = users.find(u => u.email === gmail && u.password === password);

    if (user) {
      try {
        await AsyncStorage.setItem('iduser', user.id.toString());
        navigation.navigate('Home', { user });
      } catch (error) {
        console.error('Failed to save the user ID', error);
      }
    } else {
      setWarning('Username atau Password salah');
    }
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.row}>
        <Image
          style={styles.gambarlogo}
          source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0df1fd4175bb2cb973ae2ad6ddceae2c" }}
        />
        <Text style={styles.txtlogo}>VeggieRecipe</Text>
      </View>

      {/* Text */}
      <View style={styles.ulogin}>
        <Text style={styles.txtlogin}>LOG IN</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="Email"
          placeholderTextColor='grey'
          onChangeText={(teks) => {
            setGmail(teks);
            if (warning) {
              setWarning('');
            }
          }}
          value={gmail}
        />
        <TextInput
          style={styles.txtinput}
          placeholder="Password"
          placeholderTextColor='grey'
          secureTextEntry={true}
          onChangeText={(teks) => {
            setPassword(teks);
            if (warning) {
              setWarning('');
            }
          }}
          value={password}
        />

        {warning ? <Text style={styles.warning}>{warning}</Text> : null}
      </View>

      {/* Button */}
      <View style={styles.btnlogin}>
        <TouchableOpacity style={styles.touchable} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('daftar')}>
          <Text style={styles.txtsignup}>I Don’t Have an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#Fff",
  },
  txtlogin: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 20,
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
  },
  ulogin: {
    marginTop: 80,
  },
  txtinput: {
    borderColor: 'grey',
    borderBottomWidth: 2,
    height: 40,
    marginHorizontal: 20,
    padding: 10,
    marginTop: 20,
  },
  btnlogin: {
    marginTop: 60,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
  },
  gambarlogo: {
    height: 60,
    width: 60,
    marginLeft: 15,
  },
  txtlogo: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7F50',
  },
  signup: {
    marginTop: 40,
  },
  txtsignup: {
    textDecorationLine: 'underline',
  },
  warning: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});
