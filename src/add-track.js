import React,{useEffect, useState} from 'react'
import { View, Text, ToastAndroid, TextInput, Button, TouchableOpacity } from 'react-native'

export default function AddSong({navigation}) {
   const [name, setName] = useState('')

 

   useEffect(() => {
      try{

      // addSongData()

   

      }catch(err){
         console.log(err)
      }
      }, [])

      const isValid = () => {
         if(name){
            navigation.navigate("add-song", {trackName: name, trackID : Math.round(Math.random() * Math.random() *10000)})
         }else{
            ToastAndroid.show("Field is empty", ToastAndroid.SHORT)
         }
      }

   return (
      <View style={{flex:1, backgroundColor:'#222831', justifyContent:'center',paddingTop:30,paddingHorizontal:20}}>
         <Text style={{color:'white', fontSize:30,marginTop:-60,marginBottom:30}} >Track Name</Text>
         <TextInput onChangeText={(text) => setName(text)} placeholderTextColor="gray" style={{borderColor:'white',borderWidth:1, color:'white', fontSize:25,padding:10,marginBottom:15}} placeholder="Write here"/>

         <TouchableOpacity onPress={isValid} style={{backgroundColor:'brown',padding:10}}>
            <Text style={{color:'white', textAlign:'center', fontSize:22}}>Next</Text>
         </TouchableOpacity>
         {/* <Button  onPress={isValid} title="Next" style={{marginTop:10}}/> */}
   </View>
   )
}
