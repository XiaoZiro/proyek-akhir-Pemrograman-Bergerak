import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function halaman3({navigation}) {
  return (
    <View style = {styles.container}>

      {/*image*/}
      <View>
        <Image
        style={styles.gambarlogo}
        source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/58c8b57c03e9687c592daae5c733b466" }}
      />
      </View>

      {/*teks*/}
      <View>
        <Text style = {styles.judul}>VeggieRecipe</Text>
        <Text style = {styles.teks}>VeggieReceipt is an app that provides a variety of delicious and healthy vegetarian recipes.</Text>
      </View>

      {/*button*/}
      <View style={styles.btn}>
        <View style={styles.containerbutton}>
          <TouchableOpacity style={styles.touchable_back} onPress={() => navigation.navigate('halaman2')}>
              <Text style = {styles.buttonTextback}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('login')}>
              <Text style={styles.buttonText}>Started</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor: "#FFB347",
  },
  gambarlogo:{
    height:250,
    width: 300,
    alignSelf:'center',
    marginTop: 140,
  },
  judul:{
    fontWeight:'bold',
    fontSize:23,
    marginTop:25,
    marginLeft:20,
    textAlign:'center',
  },
  teks:{
    // fontWeight:"bold",
    fontSize: 16,
    padding: 15,
    marginTop:10,
    textAlign:'center',
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerbutton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', // Adjust the width as needed
  },
  touchable: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FF7F50',
    marginVertical:10,
    borderRadius: 7,
    width: 100, 
    height: 36,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  touchable_back: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FFDAB9',
    marginVertical:10,
    borderRadius: 7,
    width: 100, 
    height: 36,
  },
  buttonTextback: {
    color: '#FF7F50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
