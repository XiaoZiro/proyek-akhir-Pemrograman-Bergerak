import React, { useState, useEffect } from 'react';
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

export default function SearchPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://powerful-weasel-visually.ngrok-free.app/resep'
      );
      console.log(result.data); 

      if (Array.isArray(result.data.data)) {
        setRecipes(result.data.data); 
        setFilteredRecipes(result.data.data); 
        console.log(result.data.data);
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

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = recipes.filter(recipe =>
      recipe.JudulResep.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const displayRecipes = searchQuery === '' ? recipes : filteredRecipes;

  return (
    <View style={styles.container}>
      {/*header*/}
      <View style={styles.header}>
        <Text style={styles.txtnama}>Food Recipe</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {searchQuery === '' && (
          <Image
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/8f707369a33ee35206bf2c2daa311178',
            }}
            style={styles.searchIcon}
          />
        )}
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* List of Recipes */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {displayRecipes.map((recipe, index) => (
          <TouchableOpacity key={index} style={styles.spacegambar} onPress={() => navigation.navigate('isi', { id: recipe.RecipeID })}>
            <ImageBackground
              source={{ uri: 'https://powerful-weasel-visually.ngrok-free.app/files/' + recipe.gambar }} 
              style={styles.popularrecipes}
              imageStyle={styles.popularStyle}></ImageBackground>
            <TouchableOpacity style={styles.buttontext} onPress={() => navigation.navigate('isi', { id: recipe.RecipeID })}>
              <Text style={styles.teks}>{recipe.JudulResep}</Text>
              
              <View style={styles.rowbutt}>
                <ImageBackground
                  source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/02445ebbde91f8d263481dadbeee10dd'}} 
                  style={styles.timeteks}></ImageBackground>
                <Text style={styles.texttime}>{recipe.WaktuMemasak}</Text>
                {/* Sesuaikan dengan atribut waktu memasak dari API */}
                <View style={styles.ratingContainer}>
                  <Image
                    source={{
                      uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/14e32b37a9102bb1378b32f19f0ccd8e',
                    }}
                    style={styles.star}
                  />
                  <Text style={styles.ratingText}>{recipe.RatingRataRata}</Text>
                  {/* Sesuaikan dengan atribut rating dari API */}
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Navigasi */}
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
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/e8d16c378396c11edb54a4524f15e4be',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Tambah')}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/f09b706bed2cc726ae950b256e03dbb7',
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
    fontWeight: '900',
    color: '#FFFFFF',
  },
  header: {
    width: 415,
    height: 70,
    backgroundColor: '#FFA500',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 40,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    width: 330,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  popularrecipes: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 362,
    height: 224,
    marginTop: 20,
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
    marginBottom: 5,
    justifyContent:'center',
    alignItems:'center',
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
