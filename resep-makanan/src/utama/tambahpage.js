import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';

export default function tambahpage({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  const [recipeData, setRecipeData] = useState({
    JudulResep: '',
    Gambar: '',
    Kategori: '',
    Deskripsi: '',
    Kesulitan: '',
    WaktuMemasak: '',
    Bahan: '',
    CaraMemasak: '',
  });

  const handlePress = (item) => {
    setSelectedItem(item);
    setRecipeData({ ...recipeData, Kesulitan: item });
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setRecipeData({ ...recipeData, Kategori: category });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result);
      setRecipeData({ ...recipeData, Gambar: result.assets[0].uri });
    }

    console.log(result);
  };

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem('iduser');
      const formData = new FormData();

      for (const key in recipeData) {
        if (recipeData.hasOwnProperty(key)) {
          formData.append(key, recipeData[key]);
        }
      }

      if (pickedImage) {
        formData.append('photos', {
          uri: pickedImage?.assets?.at(0)?.uri ?? "empty",
          type: pickedImage?.assets?.at(0)?.mimeType ?? "empty",
          name: pickedImage?.assets?.at(0)?.fileName ?? "empty",
        });
      }

      formData.append('UserID', userId);

      const response = await axios.post(
        'https://powerful-weasel-visually.ngrok-free.app/resep',
      formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        alert('Recipe added successfully!');
        navigation.navigate('Search'); 
      } else {
        console.error('Failed to add recipe. Status:', response.status);
        alert('Failed to add recipe');
      }
    } catch (error) {
      console.error('Failed to submit recipe', error);
      alert('Failed to add recipe');
    }
  };
  console.log;

  return (
    <View style={styles.container}>
      {/*header*/}
      <View style={styles.header}>
        <Text style={styles.txtnama}>Add Recipe</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rowpop}>
          <Text style={styles.txtjudul}>Nama Resep</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Enter Here"
            placeholderTextColor="grey"
            onChangeText={(text) =>
              setRecipeData({ ...recipeData, JudulResep: text })
            }
          />

          <Text style={styles.txtjudul}>Gambar</Text>
          <TouchableOpacity style={styles.inputgambar} onPress={pickImage}>
            <View style={styles.save}>
              <Text style={styles.txtisitype}>Input Gambar</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.txtgambar}>
            {pickedImage?.assets?.at(0)?.fileName}
          </Text>

          <Text style={styles.txtjudul}>Categories</Text>
          <View style={styles.rowkategori}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Breakfast')}>
                <ImageBackground
                  source={{
                    uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/4cb0355e105a8828b87a12fc549e513a',
                  }}
                  style={[
                    styles.backgroundImage,
                    selectedCategory === 'Breakfast' && styles.selectcategory,
                  ]}
                  imageStyle={styles.imageStyle}>
                  <Text style={styles.txtisi}>Breakfast</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleCategoryPress('Lunch')}>
                <ImageBackground
                  source={{
                    uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/92b2f3c4acbebf0d3de73d0e69413d38',
                  }}
                  style={[
                    styles.backgroundImage,
                    selectedCategory === 'Lunch' && styles.selectcategory,
                  ]}
                  imageStyle={styles.imageStyle}>
                  <Text style={styles.txtisi}>Lunch</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleCategoryPress('Dinner')}>
                <ImageBackground
                  source={{
                    uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/48359d8ffca23eb5cc5b0706aabb9404',
                  }}
                  style={[
                    styles.backgroundImage,
                    selectedCategory === 'Dinner' && styles.selectcategory,
                  ]}
                  imageStyle={styles.imageStyle}>
                  <Text style={styles.txtisi}>Dinner</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleCategoryPress('Dessert')}>
                <ImageBackground
                  source={{
                    uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/356dab42159de85496eaf3165e81d3d0',
                  }}
                  style={[
                    styles.backgroundImage,
                    selectedCategory === 'Dessert' && styles.selectcategory,
                  ]}
                  imageStyle={styles.imageStyle}>
                  <Text style={styles.txtisi}>Dessert</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleCategoryPress('Snack')}>
                <ImageBackground
                  source={{
                    uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/438e675161d9d0b9ddccf82d95cac1eb',
                  }}
                  style={[
                    styles.backgroundImage,
                    selectedCategory === 'Snack' && styles.selectcategory,
                  ]}
                  imageStyle={styles.imageStyle}>
                  <Text style={styles.txtisi}>Snack</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <Text style={styles.txtjudul}>Deskripsi</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Enter Here"
            placeholderTextColor="grey"
            onChangeText={(text) =>
              setRecipeData({ ...recipeData, Deskripsi: text })
            }
          />

          <Text style={styles.txtjudul}>Type</Text>
          <View style={styles.rowkategori}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={() => handlePress('easy')}>
                <View
                  style={[
                    styles.type,
                    selectedItem === 'easy' && styles.selected,
                  ]}>
                  <Text style={styles.txtisitype}>Easy</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePress('medium')}>
                <View
                  style={[
                    styles.type,
                    selectedItem === 'medium' && styles.selected,
                  ]}>
                  <Text style={styles.txtisitype}>Medium</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePress('hard')}>
                <View
                  style={[
                    styles.type,
                    selectedItem === 'hard' && styles.selected,
                  ]}>
                  <Text style={styles.txtisitype}>Hard</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <Text style={styles.txtjudul}>Time</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Enter Here"
            placeholderTextColor="grey"
            onChangeText={(text) =>
              setRecipeData({ ...recipeData, WaktuMemasak: text })
            }
          />

          <Text style={styles.txtjudul}>Ingredients</Text>
          <TextInput
            style={styles.txtbox}
            placeholder="Enter Here"
            placeholderTextColor="grey"
            textAlignVertical="top"
            multiline={true}
            numberOfLines={100}
            onChangeText={(text) =>
              setRecipeData({ ...recipeData, Bahan: text })
            }
          />

          <Text style={styles.txtjudul}>Cooking Method</Text>
          <TextInput
            style={styles.txtbox}
            placeholder="Enter Here"
            placeholderTextColor="grey"
            textAlignVertical="top"
            multiline={true}
            numberOfLines={100}
            onChangeText={(text) =>
              setRecipeData({ ...recipeData, CaraMemasak: text })
            }
          />

          <Text style={styles.txtjudul}>Rating (ex:5)</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Enter Here"
            placeholderTextColor="grey"
            onChangeText={(text) =>
              setRecipeData({ ...recipeData, RatingRataRata: text })
            }
            keyboardType="numeric"
          />

          <View style={styles.buttonsave}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.save}>
                <Text style={styles.txtisitype}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/*Navigasi*/}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d276618e1a895465ea1c0fb546fea71f',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Search')}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/719d97208500876fce587e588f91119d',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Tambah')}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d759b65ebe60264f874b7d2c76337a08',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Akun')}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/5bc3c16e8c9cb99264ac33599c05e7e0',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fff',
  },
  txtnama: {
    fontSize: 24,
    fontWeight: 900,
    color: '#FFA500',
  },
  txtjudul: {
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 30,
    fontSize: 18,
  },
  txtinput: {
    borderColor: 'grey',
    borderBottomWidth: 2,
    width: 340,
    height: 40,
    marginHorizontal: 30,
    marginTop: 5,
    fontWeight: 400,
  },
  header: {
    width: '100%',
    backgroundColor: '#FFF',
    marginTop: 70,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowpop: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent:'center',
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
  rowkategori: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
  },
  txtisi: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 101,
    height: 39,
    marginRight: 10,
    opacity: 0.7,
  },
  imageStyle: {
    borderRadius: 100,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDAB9',
    width: 101,
    height: 39,
    marginRight: 25,
    borderRadius: 100,
  },
  txtisitype: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selected: {
    backgroundColor: '#FFB347',
  },
  selectcategory: {
    opacity: 1,
  },
  txtgambar: {
    marginLeft: 30,
  },
  inputgambar: {
    marginLeft: 30,
    marginBottom: -20,
  },
  txtbox: {
    marginHorizontal: 30,
    marginTop: 5,
    width: 339,
    height: 134,
    backgroundColor: '#F6F6F6',
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top', // Mengatur teks berada di atas
    borderRadius: 7,
  },
  save: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7F50',
    width: 194,
    height: 38,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 7,
  },
  buttonsave: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
