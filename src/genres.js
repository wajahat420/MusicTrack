import React,{useState, useEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import Fontisto from "react-native-vector-icons/Fontisto"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Firebase from "../config/firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Genres({navigation, route}) {
   const { database} = Firebase()

   const [email, setEmail] = useState(false)


   const tracks = [
         {id:1, name:'Ambiente-Musik'},
         {id:2, name:'Entspannungsmusik'},
         {id:3, name:'Wellness-Musik'},
         {id:3, name:'Musik für Yoga und Pilates'}
      ]

      const [data, setData] = useState([])


      useEffect(() => {
         database()
         .ref('/songs')
         .once("value")
         .then(
            snapshot => {
              if (snapshot.val()) {
               let todos = snapshot.val()
               let keys = Object.keys(todos)

               let data=  keys.map(elem => {
                  const obj = {
                     ...todos[elem],
                        key:elem
                  }
                  return obj
               })

               let arr = []
              
               tracks.forEach(track => {
                  const temp = []
                  data.forEach(song => {
                     if(song.genre === track.name){
                        const obj = {
                           ...song,
                           title : song.songName,
                           url : song.songURL,
                           artwork : song.imgURL,
                           id : song.trackID
                        }
                        temp.push(obj)
                     }
                  }) 
                  arr.push(temp)
               })
               
               setData(arr)
               
              }
            },
            errorObject => {
              console.log("The read failed: " + errorObject.code);
            }
          );
          getEmail()

      }, [route.params])

      const getEmail = async () => {
         const mail =  await AsyncStorage.getItem('email')
         const pass =  await AsyncStorage.getItem('pass')
         console.log("ABCC", mail, pass);
         if(mail === "amazon@woelk-group.de" && pass === "ClEaNsPoRts28!"){
            setEmail(true)
         }  else{
            setEmail(false)
         }
      }

   return (
      <View style={{flex:1, backgroundColor:'#222831',paddingTop:30,paddingHorizontal:20}}>

         <View style={{alignItems:'center'}}>
            <Text style={{color:'white', fontSize:30,marginBottom:40, textAlign:'center',borderBottomWidth:1,borderBottomColor:'white', width:100}}>Genres</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("add-track")} style={{position:'absolute', right:10, top:10}}>
               <AntDesign
                  name="plussquareo"
                  size={30}
                  color="white"
               />
            </TouchableOpacity> */}
            {email  ?
            <TouchableOpacity onPress={() => navigation.navigate("add-track")} style={{position:'absolute', right:10, top:10}}>
               <AntDesign
                  name="plussquareo"
                  size={30}
                  color="white"
               />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => navigation.navigate("dashboard")} style={{position:'absolute', right:10, top:10}}>
               <Fontisto
                  name="home"
                  size={30}
                  color="white"
               />
            </TouchableOpacity>
            }

            {
               email &&
               <TouchableOpacity onPress={() => navigation.navigate("tracks")} style={{position:'absolute', left:10, top:10}}>
                  <MaterialCommunityIcons
                     name="playlist-music"
                     size={35}
                     color="white"
                  />
               </TouchableOpacity>
            }
         </View>
            
         <ScrollView contentContainerStyle={{alignItems:'center'}} style={{width:'100%'}}>
            {
               tracks.map((elem, index) => (
                  <TouchableOpacity onPress={() => navigation.navigate('cds', data[index])} key={index} activeOpacity={.9} style={{backgroundColor:'white', width:'100%',marginTop:15,paddingVertical:15,paddingHorizontal:20}}>
                     <Text style={{fontSize:20}}>{index+1}{" - "}{elem.name}</Text>
                  </TouchableOpacity>
               ))
            }
         </ScrollView>

         <View style={{flexDirection:'row',marginVertical:5, alignItems:'flex-end',justifyContent:'flex-start'}}>
            <TouchableOpacity onPress={() => navigation.navigate("shop")} activeOpacity={.9} style={{backgroundColor:'white', height:55,width:55, alignSelf:'flex-start', alignItems:'center', justifyContent:'center'}}>
               <Entypo
                  name="shopping-cart"
                  size={30}
                  color="#222831"

               />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("location")} activeOpacity={.9} style={{backgroundColor:'white', marginLeft:15, height:55,width:55, alignItems:'center', justifyContent:'center'}}>
               <Ionicons
                  name="ios-information-circle-outline"
                  size={40}
                  color="#222831"
               />
            </TouchableOpacity>
         </View>
      </View>
   )
}
