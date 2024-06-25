import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';

export default function homepage({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async (category) => {
    try {
      const url = category
        ? `https://powerful-weasel-visually.ngrok-free.app/resep?category=${category}`
        : 'https://powerful-weasel-visually.ngrok-free.app/resep';

      const result = await axios.get(url);
      console.log(result.data); 

      if (Array.isArray(result.data.data)) {
        setRecipes(result.data.data); 
      } else {
        console.error('API response is not an array');
      }
    } catch (error) {
      console.error('Failed to Fetch Recipes', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchData(category);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.row}>
          <Image
            style={styles.gambarlogo}
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0df1fd4175bb2cb973ae2ad6ddceae2c',
            }}
          />
          <Text style={styles.txtlogo}>VeggieRecipe</Text>
        </View>
        <Text style={styles.txtnama}>Hello, Maya</Text>
      </View>

      <Text style={styles.categori}>Categories</Text>

      {/* Categories */}
      <View style={styles.rowkategori}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => handleCategorySelect('Breakfast')}>
            <ImageBackground
              source={{
                uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/4cb0355e105a8828b87a12fc549e513a',
              }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Text style={styles.txtisi}>Breakfast</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategorySelect('Lunch')}>
            <ImageBackground
              source={{
                uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/92b2f3c4acbebf0d3de73d0e69413d38',
              }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Text style={styles.txtisi}>Lunch</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategorySelect('Dinner')}>
            <ImageBackground
              source={{
                uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/48359d8ffca23eb5cc5b0706aabb9404',
              }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Text style={styles.txtisi}>Dinner</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategorySelect('Dessert')}>
            <ImageBackground
              source={{
                uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/356dab42159de85496eaf3165e81d3d0',
              }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Text style={styles.txtisi}>Dessert</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategorySelect('Snack')}>
            <ImageBackground
              source={{
                uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/438e675161d9d0b9ddccf82d95cac1eb',
              }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Text style={styles.txtisi}>Snack</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Text style={styles.categori}>Popular Recipes</Text>

      {/* Popular Recipes */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {recipes.map((recipe, index) => {
          if (!selectedCategory || recipe.Category === selectedCategory) {
            return (
              <TouchableOpacity key={index} style={styles.spacegambar} onPress={() => navigation.navigate('isi', { id: recipe.RecipeID })}>
                <ImageBackground
                  source={{ uri: 'https://powerful-weasel-visually.ngrok-free.app/files/' + recipe.gambar }}
                  style={styles.popularrecipes}
                  imageStyle={styles.popularStyle}></ImageBackground>
                <TouchableOpacity style={styles.buttontext} onPress={() => navigation.navigate('isi', { id: recipe.RecipeID })}>
                  <Text style={styles.teks}>{recipe.JudulResep}</Text>
                  <View style={styles.rowbutt}>
                    <ImageBackground
                      source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/02445ebbde91f8d263481dadbeee10dd' }}
                      style={styles.timeteks}></ImageBackground>
                    <Text style={styles.texttime}>{recipe.WaktuMemasak}</Text>
                    <View style={styles.ratingContainer}>
                      <Image
                        source={{
                          uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/14e32b37a9102bb1378b32f19f0ccd8e',
                        }}
                        style={styles.star}
                      />
                      <Text style={styles.ratingText}>{recipe.RatingRataRata}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/b89d02ab868fd3437db88f2814c2518f' }}
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
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/5bc3c16e8c9cb99264ac33599c05e7e0' }}
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
  rowkategori: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
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
  },
  imageStyle: {
    borderRadius: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  gambarlogo: {
    height: 35,
    width: 35,
    marginLeft: 15,
  },
  txtlogo: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  txtnama: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  header: {
    width: 498,
    height: 85,
    backgroundColor: '#FFA500',
    marginTop: 20,
  },
  categori: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  popularrecipes: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 362,
    height: 224,
  },
  popularStyle: {
    borderRadius: 7,
  },
  buttontext: {
    width: 362,
    height: 61,
        backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: -61,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 3,
  },
  teks: {
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 13,
  },
  timeteks: {
    marginTop: 7,
    width: 15,
    height: 15,
    marginLeft: 13,
  },
  star: {
    width: 24,
    height: 24,
  },
  rowbutt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texttime: {
    fontSize: 13,
  },
  ratingContainer: {
    position: 'absolute',
    right: 30,
    bottom: -5,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    marginTop: 5,
  },
  spacegambar: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

