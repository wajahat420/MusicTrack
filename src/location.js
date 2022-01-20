import React from 'react'
import { View, Text,Image, TouchableOpacity } from 'react-native'

export default function Location({navigation}) {
   return (
      <View style={{flex:1, backgroundColor:'#222831', paddingLeft:15}}>
         <Text style={{color:'white', marginTop:10, fontSize:25, textAlign:'center',paddingTop:20, marginVertical:20}}>Address</Text>

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
            <TouchableOpacity style={{width:'80%', backgroundColor:'white'}} onPress={() => navigation.navigate("login")}>
               <Text style={{textAlign:'center',padding:15, fontWeight:'800',fontSize:18}}>Login</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}
