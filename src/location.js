import React, {useState, useEffect} from 'react'
import { View, Text,Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from "react-native-vector-icons/Fontisto"

export default function Location({navigation, route}) {
   const [email, setEmail] = useState('')

   const logout = async() => {
      await AsyncStorage.setItem('email', '')
      setEmail('')
   }


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
      }, [route.params])

      console.log("CHECK", email);

   return (
      <View style={{flex:1, backgroundColor:'#222831',paddingTop:30, paddingHorizontal:15}}>

         <View style={{alignItems:'center', marginBottom:20}}>
            <Text style={{color:'white',  fontSize:25, textAlign:'center'}}>
            Address</Text>

            <TouchableOpacity onPress={() => navigation.navigate("dashboard")} style={{position:'absolute', right:10, top:10}}>
               <Fontisto
                  name="home"
                  size={30}
                  color="white"
               />
            </TouchableOpacity>
         </View>

         <View style={{alignItems:'center'}}>

            <Image style={{width:'80%',height:100}} resizeMode='contain' source={require('../assets/images/logo.png')}/>
         </View>

         <View style={{width:200,marginTop:30}}>
            <Text style={{color:'white', marginTop:10, fontSize:25}}>Wolk Group Christian work Schumaster 2 35510 buttbach</Text>
            <Text style={{color:'white', marginTop:30, fontSize:25}}>Music:</Text>
            <Text style={{color:'white',  fontSize:25}}>Dr and Stein </Text>
            <Text style={{color:'white',  fontSize:25}}>Link </Text>
         </View>

         <View style={{width:'100%', alignItems:'center', position:'absolute', bottom:20}}>
         {
            email
            ?
            <TouchableOpacity onPress={logout} style={{width:'80%', backgroundColor:'white'}}>
                <Text style={{textAlign:'center',padding:15, fontWeight:'800',fontSize:18}}>Logout</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{width:'80%', backgroundColor:'white'}} onPress={() => navigation.navigate("login")}>
               <Text style={{textAlign:'center',padding:15, fontWeight:'800',fontSize:18}}>Login</Text>
            </TouchableOpacity>
         }
         </View>
      </View>
   )
}
