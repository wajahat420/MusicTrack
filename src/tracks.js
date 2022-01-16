import React,{useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"

export default function Tracks() {
   const [tracks, setTracks] = useState([
         {id:1, name:'first'},
         {id:2, name:'second'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:3, name:'third'},
         {id:9, name:'t'},
      ])

   return (
      <View style={{flex:1, backgroundColor:'#222831',paddingTop:30,paddingHorizontal:20}}>

         <View style={{alignItems:'center'}}>
            <Text style={{color:'white', fontSize:30,marginBottom:40, textAlign:'center',borderBottomWidth:1,borderBottomColor:'white', width:100}}>Tracks</Text>
            <TouchableOpacity style={{position:'absolute', right:10, top:10}}>
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
                  <TouchableOpacity activeOpacity={.9} style={{backgroundColor:'white', width:'100%',marginTop:15,paddingVertical:15,paddingHorizontal:20}}>
                     <Text style={{fontSize:20}}>{index+1}{" - "}{elem.name}</Text>
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

            <TouchableOpacity activeOpacity={.9} style={{backgroundColor:'white', marginLeft:15, height:55,width:55, alignItems:'center', justifyContent:'center'}}>
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
