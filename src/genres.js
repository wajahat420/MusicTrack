import React,{useState, useEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Firebase from "../config/firebase"

export default function Genres({navigation, route}) {
   const { database} = Firebase()

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

               // let data=  keys.map(elem => todos[elem])

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
                           // songs : [elem]
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
      }, [route.params])

      console.log("DATA", data)


   return (
      <View style={{flex:1, backgroundColor:'#222831',paddingTop:30,paddingHorizontal:20}}>

         <View style={{alignItems:'center'}}>
            <Text style={{color:'white', fontSize:30,marginBottom:40, textAlign:'center',borderBottomWidth:1,borderBottomColor:'white', width:100}}>Genres</Text>
           
         </View>
            
         <ScrollView contentContainerStyle={{alignItems:'center'}} style={{width:'100%'}}>
            {
               tracks.map((elem, index) => (
                  <TouchableOpacity onPress={() => navigation.navigate('songs', data[index])} key={index} activeOpacity={.9} style={{backgroundColor:'white', width:'100%',marginTop:15,paddingVertical:15,paddingHorizontal:20}}>
                     <Text style={{fontSize:20}}>{index+1}{" - "}{elem.name}</Text>
                  </TouchableOpacity>
               ))
            }
         </ScrollView>

         <View style={{flexDirection:'row',marginTop:5, alignItems:'flex-end',justifyContent:'flex-start'}}>
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
