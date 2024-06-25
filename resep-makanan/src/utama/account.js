import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground, Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function account({navigation, route}) {
  const { id } = route.params || {};
  const [users, setUser] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://powerful-weasel-visually.ngrok-free.app/users/${id}`);
          if (response.data && response.data.data && response.data.data.length > 0) {
            setUser(response.data.data[0]);
          } else {
            console.error('No recipe found');
          }
        } else {
          console.error('No ID provided in route parameters');
        }
      } catch (error) {
        console.error('There was an error fetching the recipe!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [id]);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout Cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            navigation.replace('login');
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style = {styles.container}>
      
      {/*header*/}
      <View style={styles.header}>
        <Image
        source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/4dd6144c57eb408aeccc4e80017355a3'}}
        style={styles.backgroundprofile}
        />

        <TouchableOpacity sytle={styles.profilecontainer}>
        <ImageBackground 
        source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/dfc40b2fcbd9f9577cf19b05f32d74fe'}}
        style={styles.profile}
        />

        </TouchableOpacity>
      
        <Text style={styles.txtnama}>sela</Text>
      </View>
      

      <View style={styles.rowpop}>
      {/*gambar 1*/}
        <TouchableOpacity style={styles.spacegambar} onPress={() => navigation.navigate('isiakun', { id: users.id })}>
          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/496b713f2942b3330a9de7eaa9a7bffa'}}
          style={styles.icongambar}
          />
          <Text style={styles.textbutton}>Account</Text>

          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d048aff655c11369c7222658faa93b8e'}}
          style={styles.nexticon}
          />
        </TouchableOpacity>

        {/*gambar 2*/}

        <TouchableOpacity style={styles.spacegambar}>
          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/bfd64d64a6af1d99673993b635b196a5'}}
          style={styles.icongambar}
          />
          <Text style={styles.textbutton}>Language</Text>

          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d048aff655c11369c7222658faa93b8e'}}
          style={styles.nexticonlanguage}
          />
        </TouchableOpacity>


        {/*gambar 3*/}

        <TouchableOpacity style={styles.spacegambar} onPress={() => navigation.navigate('help')}>
          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/dcbf5966b6c6749a37004dcbbf6cf4f0'}}
          style={styles.icongambar}
          />
          <Text style={styles.textbutton}>Help</Text>

          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d048aff655c11369c7222658faa93b8e'}}
          style={styles.nexticonhelp}
          />
        </TouchableOpacity>

        {/*gambar 4*/}

        <TouchableOpacity style={styles.spacegambar} onPress={() => navigation.navigate('privacy')}>
          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/954b66747dded2db80af4de6e53d9086'}}
          style={styles.icongambar}
          />
          <Text style={styles.textbutton}>Privacy Policy and Terms of Service</Text>

          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d048aff655c11369c7222658faa93b8e'}}
          style={styles.nexticonprivacy}
          />
        </TouchableOpacity>

        {/*gambar 5*/}

        <TouchableOpacity style={styles.spacegambar} onPress={handleLogout}>
          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/8f9f4f81f854204adba6697954953f3b'}}
          style={styles.icongambar}
          />
          <Text style={styles.textbutton}>Log Out</Text>

          <Image
          source={{uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d048aff655c11369c7222658faa93b8e'}}
          style={styles.nexticonlogout}
          />
        </TouchableOpacity>
      </View>

      {/*Navigasi*/}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d276618e1a895465ea1c0fb546fea71f' }}
          />
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Search')}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/719d97208500876fce587e588f91119d' }}
          />
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Tambah')}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/f09b706bed2cc726ae950b256e03dbb7' }}
          />
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Akun')}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/66f3cd9171d08d6cea4ed62e3840ed27' }}
          />
      
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor: "#Fff",
  },
  txtnama:{
    fontSize:24,
    fontWeight:900,
    color:'#FFFFFF',
  },
  backgroundprofile: {
    width: '100%',
    height: 258,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent:'center',
    alignItems:'center',
  },
  profilecontainer: {
    justifyContent:'center',
    alignItems:'center',
    // position: 'absolute',
    // left: '50%',
    // transform: [{ translateX: -54.5 }],
  },
  profile: {
    width: 109,
    height: 109,
    borderRadius: 54.5,
    marginTop:70,
  },
  header:{
    marginTop:50,
    justifyContent: 'center',
    alignItems:'center',
  },
  rowpop:{
    flex:1,
    alignItems: 'center',
    marginTop:80,
    // justifyContent:'center',
  },
  spacegambar:{
    flexDirection:'row',
    width:333,
    height:50,
    backgroundColor:'#FFB347',
    marginBottom:15,
    borderRadius:10,
    // justifyContent:'center',
    alignItems:'center',
  },
  icongambar:{
    height:24,
    width:24,
    marginLeft:15
  },
  textbutton:{
    marginLeft:10,
    color:'#fff',
    fontWeight:'bold',
  },
  nexticon:{
    width:19,
    height:19,
    marginLeft:195,
  },
  nexticonlanguage:{
    width:19,
    height:19,
    marginLeft:185,
  },
  nexticonhelp:{
    width:19,
    height:19,
    marginLeft:220,
  },
  nexticonprivacy:{
    width:19,
    height:19,
    marginLeft:8,
  },
  nexticonlogout:{
    width:19,
    height:19,
    marginLeft:195,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    backgroundColor: '#ffffff',
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
