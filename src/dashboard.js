import React from 'react'
import { View, Text,TouchableOpacity, Image } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontisto from "react-native-vector-icons/Fontisto"

export default function Dashboard({navigation}) {
   return (
   <View style={{flex:1, backgroundColor:'#222831', alignItems:'center', justifyContent:'center'}}>

      {/* <Text style={{color:'white', fontSize:30,position:'absolute', top:60}}>Dashboard</Text> */}
      <Image style={{width:'80%',height:100, position:'absolute', top:60}} resizeMode='contain' source={require('../assets/images/logo.png')}/>

      <View style={{flexDirection:'row',width:'80%',marginTop:50,justifyContent:'space-between'}}>

         <TouchableOpacity onPress={() => navigation.navigate("genres")} style={{backgroundColor:'white', height:80,width:80, alignItems:'center', justifyContent:'center'}}>
            <Fontisto
               name="music-note"
               size={50}
               color="#222831"
            />
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate("shop")} style={{backgroundColor:'white', height:80,width:80, alignItems:'center', justifyContent:'center'}}>
            <Entypo
               name="shopping-cart"
               size={50}
               color="#222831"

            />
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate("location")} style={{backgroundColor:'white', height:80,width:80, alignItems:'center', justifyContent:'center'}}>
            <Ionicons
               name="ios-information-circle-outline"
               size={60}
               color="#222831"
            />
         </TouchableOpacity>
      </View>


   </View>
   )
}
