import React, {useEffect, useRef,useState} from 'react'
import { View, Text, TouchableOpacity, Alert, SafeAreaView,StyleSheet,Image, Dimensions, FlatList, Animated ,ScrollView} from 'react-native'

import TrackPlayer, {
   Event,
   State,
   usePlaybackState,
   useProgress,
   useTrackPlayerEvents
} from 'react-native-track-player'
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import Firebase from '../config/firebase';


const {width, height} = Dimensions.get('window')



export default function Songs({route, navigation}) {
   const {storage, database} = Firebase()

   const playbackState = usePlaybackState()
   const scrollX = useRef(new Animated.Value(0)).current

   const [songIndex, setSongIndex] = useState(0)
   const [deletePopup, setDeletePopup] = useState(-1)

   let progress = useProgress()


   const songs = route.params.map((elem, index) => {
      const obj = {
         id : index,
         artwork : elem.artwork,
         title : elem.title,
         url : elem.url
      }
      return obj
   })

   // console.log("SONNN", route.params)
   const setupPlayer = async() => {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.add(songs)
   }
   
   const togglePlayback = async(playbackState, index) => {
      const currentTrack = await TrackPlayer.getCurrentTrack()
   
      if( currentTrack != null ){
         if( playbackState == State.Paused || songIndex !== index){
            await TrackPlayer.play()
         } else{
            await TrackPlayer.pause()
         }
      }
   }

   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if( event.type == Event.PlaybackTrackChanged && event.nextTrack != null){
         const track = await TrackPlayer.getTrack(event.nextTrack)

         if(track.id){
            setSongIndex(track.id)
         }
      }
   })

   const onDelete = (song, index) =>
   Alert.alert(
     "Confirm Delete!",
     `${song.title} will be deleted permanently.`,
     [
       {
         text: "Cancel",
         onPress: () => console.log("Cancel Pressed"),
         style: "cancel"
       },
       { text: "Yes", onPress: () => deleteFromDB(index) }
     ]
   );

   const deleteFromDB = (index) => {
      let userRef = database().ref('songs/' + route.params[index].key);
      userRef.remove()
      .then(res => navigation.navigate("tracks", {empty:""}))
      .catch(err => console.log("Err", err))
   }
 

   useEffect(() => {
      setupPlayer()
      return () =>  scrollX.removeAllListeners()
   }, [])


   const skipTo = async(trackId) => {

      if(trackId !== songIndex){
         await TrackPlayer.skip(trackId)
         setSongIndex(trackId)
         TrackPlayer.play()
      }else{
         togglePlayback(playbackState, trackId)
      }

   }

      const currentPosition = parseInt(new Date(progress.position * 1000).toISOString().substring(19, 17))
          return (
            <SafeAreaView style={styles.container}>
               <View style={styles.mainContainer}>
                  <Text style={{color:'white', fontSize:30, textAlign:'center',marginBottom:25}}>Songs</Text>

                  <ScrollView>
                     {
                        songs.map((elem, index) => (
                           <TouchableOpacity key={index} onPress={() => navigation.navigate("player", {data:route.params,index})} activeOpacity={.9} style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:13, paddingVertical:10, elevation:5, backgroundColor:'white', marginTop:15}}>
                              <View style={{flexDirection:'row'}}>

                                 <View>
                                    <Text numberOfLines={1} style={{color:'black', width:100}}>{elem.title}</Text>
                                    <Text numberOfLines={1} style={{color:'gray', marginTop:5,width:100}}>{route.params[index].artist}</Text>
                                 </View>

                                 <TouchableOpacity onPress={() => skipTo(index)} style={{marginLeft:20}}>
                                    {(songIndex === index && currentPosition > 0 && playbackState == State.Playing)
                                       ?
                                       <AntDesign
                                          name="pausecircleo"
                                          color="black"
                                          size={32}
                                       />
                                       :
                                       <Feather
                                          name="play-circle"
                                          color="black"
                                          size={32}
                                       />
                                    }
                                 </TouchableOpacity>
                              </View>

                              {
                                 deletePopup === index &&
                                 <TouchableOpacity onPress={() => onDelete(elem,index)} style={{position:'absolute',elevation:5,backgroundColor:'white',padding:8, right:18, top:10}}>
                                    <Text style={{color:'red'}}>Delete</Text>
                                 </TouchableOpacity>
                              }
                              

                              <TouchableOpacity onPress={(() => setDeletePopup(deletePopup === index ? -1 : index))} style={{position:'absolute', right:0, top:8,padding:5}}>
                                 <Entypo
                                    name="dots-three-vertical"
                                    color="black"
                                    size={20}
                                 />
                              </TouchableOpacity>

                              {
                                 (songIndex === index && currentPosition > 0)
                                 &&
                                 <Text style={{color:'black',marginRight:10}}>{new Date(progress.position * 1000).toISOString().substring(19, 14)} / {new Date(progress.duration * 1000).toISOString().substring(19, 14)}</Text>
                              }
                           </TouchableOpacity>
                        ))
                     }
                  </ScrollView>
               </View>
            </SafeAreaView>
          )
}


const styles = StyleSheet.create({
   container:{
      flex:1,
      alignItems:'center',
      width:'100%',
      justifyContent:'center',
      backgroundColor:'#222831'
   },
   dummy : {
      width : '100%',
      height: '100%',
      backgroundColor:'gray'
   },
   mainContainer:{
      flex:1,
      width:'100%',
      padding:20
   },
   bottomContainer:{
      borderTopColor:'#393E46',
      borderTopWidth:1,
      width:width,
      alignItems:'center',
      paddingVertical:15
   },
   artworkWrapper:{
      width : 300,
      height : 340,
      marginBottom:25,
      elevation:5,
      backgroundColor:'gray'
   },
   artworkImg:{
      width : '100%',
      height: '100%',
      borderRadius:15
   },
   title : {
      fontSize:18,
      fontWeight:'600',
      textAlign : 'center',
      color:'#EEEEEE'
   },
   artist:{
      fontSize:16,
      fontWeight:'200',
      textAlign : 'center',
      color:'#EEEEEE'
   },
   progress:{
      width:'100%'
   },
   progressContainer:{
      // width:350,
      width:'100%',
      height:40,
      marginTop:25,
      flexDirection:'row'
   },
   progressLabelContainer:{
      marginHorizontal:10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
   },
   progressLabelTxt:{
      color : '#fff'
   },
   musicControls:{
      flexDirection:'row',
      width:'60%',
      justifyContent:'space-between',
      marginTop:15,
      alignItems:'center'
   }
})