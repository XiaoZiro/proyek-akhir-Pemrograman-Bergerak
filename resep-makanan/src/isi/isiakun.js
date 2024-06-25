import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

export default function Account({ navigation, route }) {
  const { id } = route.params || {};
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://powerful-weasel-visually.ngrok-free.app/users/${id}`);
          if (response.data) {
            const user = response.data;
            setUsername(user.username);
            setPassword(user.password);
            setEmail(user.email);
          } else {
            console.error('No user found');
          }
        } else {
          console.error('No ID provided in route parameters');
        }
      } catch (error) {
        console.error('There was an error fetching the user data!', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            console.log("User logged out");
            navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/8e25182104b4184d62331dd5cd49a06e' }}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Account</Text>

      <Text style={styles.label}>Username</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{username}</Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{email}</Text>
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.passwordText]}>
            {showPassword ? password : '*******'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={{ uri: showPassword ? 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/07b93793a3c4d88c1aee03c30acafc16' : 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0913e972bdd26c63a2d23d1e0818e6c4' }}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
    marginTop: 60,
  },
  backIcon: {
    width: 35,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '700',
  },
  textContainer: {
    width: 330,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    paddingBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 25,
    height: 20,
    marginLeft: 10,
  },
});
