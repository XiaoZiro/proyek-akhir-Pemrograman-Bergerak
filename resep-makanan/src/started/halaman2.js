import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function halaman2({navigation}) {
  return (
    <View style = {styles.container}>

      {/*image*/}
      <View>
        <Image
        style={styles.gambarlogo}
        source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9944b6dbc124f1bd7572726a7aea82fc" }}
      />
      </View>

      {/*teks*/}
      <View>
        <Text style = {styles.judul}>Recipe Categories</Text>
        <Text style = {styles.teks}>Recipe categories make it easy for users to filter and find their desired dishes.</Text>
      </View>

      {/*button*/}
      <View style={styles.btn}>
        <View style={styles.containerbutton}>
          <TouchableOpacity style={styles.touchable_back} onPress={() => navigation.navigate('halaman1')}>
              <Text style = {styles.buttonTextback}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('halaman3')}>
              <Text style={styles.buttonText}>Next</Text>
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
    height:270,
    width: 270,
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
