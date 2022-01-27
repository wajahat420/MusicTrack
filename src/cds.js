import React from 'react';
import { View, Text, Image , ScrollView,TouchableOpacity} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto"

export default function Cds({route, navigation}) {

   const songs = route.params 
   ? route.params.map((elem, index) => {
      const obj = {
         id : index,
         artwork : elem.artwork,
         title : elem.title,
         url : elem.url
      }
      return obj
   })
   : []


  return (
    <View style={{
         flex:1,
         alignItems:'center',
         // width:'100%',
         backgroundColor:'#222831',
         paddingTop:30
    }}>
      <View style={{alignItems:'center', width:'100%'}}>
         <Text style={{color:'white', fontSize:30,marginBottom:40, textAlign:'center',borderBottomWidth:1,borderBottomColor:'white'}}>
         COVERS</Text>
         
         <TouchableOpacity onPress={() => navigation.navigate("dashboard")} style={{position:'absolute', right:30, top:10}}>
               <Fontisto
                  name="home"
                  size={30}
                  color="white"
               />
         </TouchableOpacity>

      </View>
      <ScrollView>
         {
            songs.map(elem => {
               return(

               <View style={{width:'100%', alignItems:'center',paddingHorizontal:25, marginBottom:20}}>
                  <TouchableOpacity onPress={() => navigation.navigate('songs', songs)} style={{width:300,height:340, backgroundColor: !elem.artwork ? 'gray' : 'black'}}>
                  {
                     elem.artwork 
                     ?
                     
                     <Image style={{width:'100%', resizeMode:'contain', height:'100%'}} source={{uri:elem.artwork}}/>
                     :
                     <></>
                  }
                  </TouchableOpacity>
                  <Text style={{color:'white', fontSize:22,marginTop:10}}>{elem.title}</Text>
               </View>
               )
            })
         }
      </ScrollView>
    </View>
  );
}
