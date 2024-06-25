import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default function makananpage({ route, navigation }) {
  const { id } = route.params || {};
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://powerful-weasel-visually.ngrok-free.app/resep/${id}`);
          if (response.data && response.data.data && response.data.data.length > 0) {
            setRecipe(response.data.data[0]);
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

    fetchRecipe();
  }, [id]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://powerful-weasel-visually.ngrok-free.app/files/' + recipe.gambar  }}
          style={styles.backgroundprofile}
        />
        <View style={styles.iconheader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/8e25182104b4184d62331dd5cd49a06e' }}
              style={styles.backicon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable content */}
      <View style={styles.recipeContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {recipe ? (
            <>
              <Text style={styles.recipeTitle}>{recipe.JudulResep}</Text>
              <Text style={styles.recipeInfo}>{recipe.WaktuMemasak} - {recipe.Kesulitan}</Text>

              <View style={styles.ratingContainer}>
                <Image
                  source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/14e32b37a9102bb1378b32f19f0ccd8e' }}
                  style={styles.star}
                />
                <Text style={styles.ratingText}>{recipe.RatingRataRata}</Text>
              </View>

              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {recipe.Deskripsi}
              </Text>

              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.ingredient}>{recipe.Bahan}</Text>

              <Text style={styles.sectionTitle}>Cooking Method</Text>
              <Text style={styles.step}>{recipe.CaraMemasak}</Text>
            </>
          ) : (
            <Text>No recipe found</Text>
          )}
        </ScrollView>
      </View>

      {/* Navigation */}
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
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9a39a821db222c3189732df7c466b2c1' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Like')}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d27d87ad6fbce41adbe2a24c9e108485' }}
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
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  backgroundprofile: {
    width: '100%',
    height: 258,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '90%',
    position: 'absolute',
    top: 10,
  },
  backicon: {
    width: 43,
    height: 43,
  },
  likeicon: {
    width: 43,
    height: 43,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  recipeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginTop: 270, // Adjust this value to fit your layout
    flex: 1,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  recipeInfo: {
    fontSize: 14,
    color: '#888',
  },
  star: {
    width: 24,
    height: 24,
  },
  ratingContainer: {
    position: 'absolute',
    right: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  ingredient: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  step: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
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

