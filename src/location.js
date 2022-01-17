import React from 'react'
import { View, Text } from 'react-native'

export default function Location() {
   return (
      <View style={{flex:1, backgroundColor:'#222831', paddingLeft:15}}>
         <Text style={{color:'white', marginTop:10, fontSize:25, textAlign:'center',paddingTop:20, marginVertical:40}}>Address</Text>

         <View style={{width:200}}>
            <Text style={{color:'white', marginTop:10, fontSize:25}}>Wolk Group Christian work Schumaster 2 35510 buttbach</Text>
            <Text style={{color:'white', marginTop:30, fontSize:25}}>Music:</Text>
            <Text style={{color:'white',  fontSize:25}}>Dr and Stein </Text>
            <Text style={{color:'white',  fontSize:25}}>Link </Text>
         </View>
      </View>
   )
}
