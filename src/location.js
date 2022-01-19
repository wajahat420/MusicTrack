import React from 'react'
import { View, Text,Image } from 'react-native'

export default function Location() {
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
      </View>
   )
}
