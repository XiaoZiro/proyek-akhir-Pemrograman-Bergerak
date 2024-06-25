import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Image } from 'react-native';

export default function PrivacyPolicy({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/8e25182104b4184d62331dd5cd49a06e' }}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Privacy Policy and Terms of Service</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          At VeggieRecipe, accessible from veggierecipe.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by VeggieRecipe and how we use it.
        </Text>
        <Text style={styles.text}>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </Text>
        <Text style={styles.text}>
          This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect at VeggieRecipe. This policy is not applicable to any information collected offline or via channels other than this website.
        </Text>
        <Text style={styles.text}>
          Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
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
    marginBottom: 20,
    color:'#FFBB59',
    justifyContent:'center',
    alignItems:'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
