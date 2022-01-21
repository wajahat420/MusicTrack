import React,{useEffect, useState} from 'react'
import { View, Text, ToastAndroid, TextInput, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddSong({navigation}) {
   const [name, setName] = useState('')
   const [pass, setPass] = useState('')
   const [email, setEmail] = useState('')

   useEffect(() => {
      try{
         const getEmail = async () => {
            const mail =  await AsyncStorage.getItem('email')
            setEmail(mail)
            console.log("MAIL", mail);
         }
         getEmail()
      // addSongData()

   

      }catch(err){
         console.log(err)
      }
      }, [])

      const isValid = async() => {
         if(name && pass){
            await AsyncStorage.setItem('email', name)
            await AsyncStorage.setItem('pass', pass)
            // setEmail(name)
            // setEmail(name)
            navigation.navigate("location", "check")
         }else{
            ToastAndroid.show("Kindly fill the fields", ToastAndroid.SHORT)
         }
      }

   return (
      <View style={{flex:1, backgroundColor:'#222831', justifyContent:'center',paddingTop:30,paddingHorizontal:20}}>
         <Text style={{color:'white', textAlign:'center', fontSize:30,marginTop:-60,marginBottom:30}} >Login </Text>
         <TextInput onChangeText={(text) => setName(text)} placeholderTextColor="gray" style={{borderColor:'white',borderWidth:1, color:'white', fontSize:25,padding:10,marginBottom:15}} placeholder="email@gmail.com"/>
         <TextInput onChangeText={(text) => setPass(text)} placeholderTextColor="gray" style={{borderColor:'white',borderWidth:1, color:'white', fontSize:25,padding:10,marginBottom:15}} placeholder="password"/>

        <View style={{position:'absolute', alignSelf:'center', bottom:20,  backgroundColor:'gray',width:'100%'}}>
            
               <TouchableOpacity onPress={isValid} style={{backgroundColor:'brown',padding:10, width:'100%'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:22}}>Login</Text>
               </TouchableOpacity>
          
        </View>
   </View>
   )
}
