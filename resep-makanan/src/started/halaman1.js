import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function halaman1({navigation}) {
  return (
    <View style = {styles.container}>

      {/*image*/}
      <View>
        <Image
        style={styles.gambarlogo}
        source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/431d8f881126df6c6e994b6cb83d953d" }}
      />
      </View>

      {/*teks*/}
      <View>
        <Text style = {styles.judul}>Search for Receipt</Text>
        <Text style = {styles.teks}>Search for recipe inspiration to spice up {'\n'} your meals!</Text>
      </View>

      {/*button*/}
      <View style={styles.btn_next}>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('halaman2')}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    height:339,
    width: 270,
    alignSelf:'center',
    marginTop: 120,
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
  btn_next:{
    marginTop:80,
    marginLeft:280,
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
});
