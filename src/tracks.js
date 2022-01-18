import React,{useState, useEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Firebase from "../config/firebase"

export default function Tracks({navigation, route}) {
   const { database} = Firebase()

   const [tracks, setTracks] = useState([
         // {id:1, name:'first'},
         // {id:2, name:'second'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:3, name:'third'},
         // {id:9, name:'t'},
      ])

      useEffect(() => {
         database()
         .ref('/songs')
         .once("value")
         .then(
            snapshot => {
              if (snapshot.val()) {
               let todos = snapshot.val()
               let keys = Object.keys(todos)

               let data=  keys.map(elem => todos[elem])
               let arr = []
               // let songs = []
               data.forEach(elem => {
                  const find = arr.findIndex(item=> item.id == elem.trackID)
                  const obj = {
                     ...elem,
                     title : elem.songName,
                     url : elem.songURL,
                     artwork : elem.imgURL,
                     id : elem.trackID
                     // songs : [elem]
                  }
                  if(find == -1){
                     obj["songs"] = [obj]
                     arr.push(obj)
                     // songs.push({...elem,songs:[elem]})
                     // return true
                  }else{
                     arr[find].songs.push(obj)
                  }
                  // return false
               } )
                console.log(arr)
                setTracks(arr)
               
              }
            },
            errorObject => {
              console.log("The read failed: " + errorObject.code);
            }
          );
      }, [route.params])

   return (
      <View style={{flex:1, backgroundColor:'#222831',paddingTop:30,paddingHorizontal:20}}>

         <View style={{alignItems:'center'}}>
            <Text style={{color:'white', fontSize:30,marginBottom:40, textAlign:'center',borderBottomWidth:1,borderBottomColor:'white', width:100}}>Tracks</Text>
            <TouchableOpacity onPress={() => navigation.navigate("add-track")} style={{position:'absolute', right:10, top:10}}>
               <AntDesign
                  name="plussquareo"
                  size={30}
                  color="white"
               />
            </TouchableOpacity>
         </View>
            
         <ScrollView contentContainerStyle={{alignItems:'center'}} style={{width:'100%'}}>
            {
               tracks.map((elem, index) => (
                  <TouchableOpacity onPress={() => navigation.navigate('songs', elem.songs)} key={index} activeOpacity={.9} style={{backgroundColor:'white', width:'100%',marginTop:15,paddingVertical:15,paddingHorizontal:20}}>
                     <Text style={{fontSize:20}}>{index+1}{" - "}{elem.trackName}</Text>
                  </TouchableOpacity>
               ))
            }
         </ScrollView>

         <View style={{flexDirection:'row',marginTop:5, alignItems:'flex-end',justifyContent:'flex-start'}}>
            <TouchableOpacity activeOpacity={.9} style={{backgroundColor:'white', height:55,width:55, alignSelf:'flex-start', alignItems:'center', justifyContent:'center'}}>
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
