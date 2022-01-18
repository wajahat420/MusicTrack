import React, {useEffect, useRef,useState} from 'react'
import { View, Text, TouchableOpacity, SafeAreaView,StyleSheet,Image, Dimensions, FlatList, Animated ,ScrollView} from 'react-native'

import TrackPlayer, {
   Capability,
   Event,
   RepeatMode,
   State,
   usePlaybackState,
   useProgress,
   useTrackPlayerEvents
} from 'react-native-track-player'

import Ionicons from 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('window')

// const songs = [
//    {
//       title : 'song-1',
//       // artist : 'writer-1',
//       url : 'https://firebasestorage.googleapis.com/v0/b/my-project-1-5f5ff.appspot.com/o/allFiles%2F4.mp3?alt=media&token=4138588b-f96e-4580-a441-43bdcc3d690b',
//       // id:1,
//       artwork : require('../assets/images/1.jpg'),
//       // duration:131
//    },
//    {
//       title : 'song-2',
//       // artist : 'writer-2',
//       artwork : require('../assets/images/2.jpg'),

//       url : require('../assets/songs/2.mp3'),
//       // id:2,
//       // duration:131
//    },
//    {
//       title : 'song-3',
//       // artist : 'writer-3',
//       artwork : require('../assets/images/3.jpeg'),
//       url : require('../assets/songs/3.mp3'),
//       // id:3,
//       // duration:131
//    }
// ]



export default function Songs({route}) {
   const playbackState = usePlaybackState()
   const scrollX = useRef(new Animated.Value(0)).current

   const [songIndex, setSongIndex] = useState(0)
   let progress = useProgress()

   const [trackArtwork, settTrackArtwork] = useState('')
   const [trackArtist, settTrackArtist] = useState('')
   const [trackTitle, settTrackTitle] = useState('')
   // const [songs, setSongs] = useState([])
   const songs = route.params.map((elem, index) => {
      const obj = {
         id : index,
         artwork : elem.artwork,
         title : elem.title,
         url : elem.url
      }
      return obj
   })

   const setupPlayer = async() => {
      await TrackPlayer.setupPlayer()
      console.log("SONGS", songs)
      await TrackPlayer.add(songs)
   }
   
   const togglePlayback = async(playbackState, index) => {
      console.log("PLAY", index, songIndex)
      const currentTrack = await TrackPlayer.getCurrentTrack()
   
      if( currentTrack != null ){
         if( playbackState == State.Paused || songIndex !== index){
            // if(songIndex !== index){
            // }
            await TrackPlayer.play()
         } else{
            await TrackPlayer.pause()
         }
      }
   }
 

   useEffect(() => {
      console.log("PARAMS",songs)
      // setSongs(route.params)
      setupPlayer()

      scrollX.addListener(({ value }) => {
         const index = Math.round(value / width)
         // skipTo(index)
         // setSongIndex(index)
      })
     

      return () =>  scrollX.removeAllListeners()
   }, [])



   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if( event.type == Event.PlaybackTrackChanged && event.nextTrack != null){
         const track = await TrackPlayer.getTrack(event.nextTrack)
         const {title, artwork, artist, id} = track
      
         setSongIndex(id)
      }
   })

   const skipTo = async(trackId) => {
      console.log("ID", trackId)
      togglePlayback(playbackState, trackId)

      if(trackId !== songIndex){
         await TrackPlayer.skip(trackId)
         setSongIndex(trackId)
      }

   }

   const renderSongs = ({ item, index}) => (
      <Animated.View style={{ justifyContent:'center',alignItems:'center', width:width}}>
         <View style={styles.artworkWrapper}>
            {(trackArtwork || item.artwork)
            ?
            <Image style={styles.artworkImg} source={{uri : trackArtwork || item.artwork}}/>
            :
            <View style={styles.dummy}/>
            
            }

         </View>
      </Animated.View>
   )
      const currentPosition = parseInt(new Date(progress.position * 1000).toISOString().substring(19, 17))
      console.log("ANS = ",currentPosition)
          return (
            <SafeAreaView style={styles.container}>
               <View style={styles.mainContainer}>
                  <Text style={{color:'white', fontSize:30}}>Songs</Text>

                  <ScrollView>
                     {
                        songs.map((elem, index) => (
                           <TouchableOpacity onPress={() => skipTo(index)} activeOpacity={.9} style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:13, paddingVertical:10, elevation:5, backgroundColor:'white', marginTop:10}}>
                              <View>
                                 <Text style={{color:'black'}}>{elem.title}</Text>
                                 <Text style={{color:'gray', marginTop:5}}>Artist</Text>
                              </View>

                              {
                                 (songIndex === index && currentPosition > 0)
                                 &&
                                 <Text style={{color:'black'}}>{new Date(progress.position * 1000).toISOString().substring(19, 14)} / {new Date(progress.duration * 1000).toISOString().substring(19, 14)}</Text>
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
      // alignItems:'center',
      // justifyContent:'center'
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