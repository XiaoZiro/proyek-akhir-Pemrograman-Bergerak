import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HelpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/8e25182104b4184d62331dd5cd49a06e' }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem}>
        <Image
          source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/f70a7bb0f187b671746b1719362c87d6' }}
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Log in & log out di VeggieRecipe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image
          source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/f70a7bb0f187b671746b1719362c87d6' }}
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Input Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop:70,
    justifyContent:'space-between',
    width:'60%',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFBF69',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC078',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    fontWeight:'bold',
  },
});
