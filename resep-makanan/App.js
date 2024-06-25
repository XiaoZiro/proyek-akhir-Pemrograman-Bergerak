import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GetStartedScreen from './src/started/halaman1';
import halaman2 from './src/started/halaman2';
import halaman3 from './src/started/halaman3';
import login from './src/login/login';
import daftar from './src/login/daftar';
import HomeScreen from './src/utama/homepage';
import SearchScreen from './src/utama/searchpage';
import PlusScreen from './src/utama/tambahpage';
import AccountScreen from './src/utama/account';
import isimakanan from './src/isi/makananpage';
import isiakun from './src/isi/isiakun';
import help from './src/isi/help';
import privacy from './src/isi/privacy';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Halaman dua" component={halaman2}/>
      <Tab.Screen name="Halaman tiga" component={halaman3}/>
      <Tab.Screen name="login" component={login}/>
      <Tab.Screen name="daftar" component={daftar}/>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Tambah" component={PlusScreen} />
      <Tab.Screen name="Akun" component={AccountScreen} />
      <Tab.Screen name="isimakanan" component={isimakanan}/>
      <Tab.Screen name="isiakun" component={isiakun}/>
      <Tab.Screen name="help" component={help}/>
      <Tab.Screen name="privacy" component={privacy}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetStarted"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="halaman1" component={GetStartedScreen} />
        <Stack.Screen name="halaman2" component={halaman2}/>
        <Stack.Screen name="halaman3" component={halaman3}/>
        <Stack.Screen name="login" component = {login}/>
        <Stack.Screen name="daftar" component = {daftar}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Tambah" component={PlusScreen} />
        <Stack.Screen name="Akun" component={AccountScreen} />
        <Stack.Screen name="isi" component = {isimakanan}/>
        <Stack.Screen name="isiakun" component = {isiakun}/>
        <Stack.Screen name="help" component = {help}/>
        <Stack.Screen name="privacy" component = {privacy}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
