import React, {useEffect, useRef,useState} from 'react'
import { View, Text, TouchableOpacity, SafeAreaView,StyleSheet,Image, Dimensions, FlatList, Animated } from 'react-native'

import TrackPlayer, {
   Capability,
   Event,
   RepeatMode,
   State,
   usePlaybackState,
   useProgress,
   useTrackPlayerEvents
} from 'react-native-track-player'

import Slider from '@react-native-community/slider'
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



export default function Index({route}) {
   const playbackState = usePlaybackState()
   const scrollX = useRef(new Animated.Value(0)).current

   const [songIndex, setSongIndex] = useState(0)
   const progress = useProgress()

   const [trackArtwork, settTrackArtwork] = useState('')
   const [trackArtist, settTrackArtist] = useState('')
   const [trackTitle, settTrackTitle] = useState('')
   // const [songs, setSongs] = useState([])
   const songs = route.params?.data.map((elem, index) => {
      const obj = {
         artwork : elem.artwork,
         title : elem.title,
         url : elem.url
      }
      return obj
   })

   const setupPlayer = async() => {
      await TrackPlayer.setupPlayer()
      const index = route.params.index

      await TrackPlayer.add(songs)
      await TrackPlayer.skip(index)



   }
   
   const togglePlayback = async(playbackState) => {
      const currentTrack = await TrackPlayer.getCurrentTrack()
   
      if( currentTrack != null ){
         if( playbackState == State.Paused ){
            await TrackPlayer.play()
         } else{
            await TrackPlayer.pause()
         }
      }
   }
 

   useEffect(() => {
      setupPlayer()


      scrollX.addListener(({ value }) => {
         const index = Math.round(value / width)
         skipTo(index)
         setSongIndex(index)
      })
     

      return () =>  scrollX.removeAllListeners()
   }, [])



   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if( event.type == Event.PlaybackTrackChanged && event.nextTrack != null){
         const track = await TrackPlayer.getTrack(event.nextTrack)
         const {title, artwork, artist} = track
         settTrackTitle(title)
         settTrackArtwork(artwork)
         settTrackArtist(artist)
      }
   })

   const skipToNext = () => {
      this.songSlider.scrollToOffset({
         offset : (songIndex + 1) * width
      })
   }

   const skipToPrevious = () => {
      this.songSlider.scrollToOffset({
         offset : (songIndex - 1) * width
      })
   }

   const skipTo = async(trackId) => {
      await TrackPlayer.skip(trackId)
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
          return (
            <SafeAreaView style={styles.container}>
               <View style={styles.mainContainer}>

                  <Animated.FlatList
                     ref = {ref => {this.songSlider = ref}}
                     data={songs}
                     renderItem={renderSongs}
                     keyExtractor={item => item.id}
                     horizontal
                     pagingEnabled
                     showsHorizontalScrollIndicator={false}
                     scrollEventThrottle={16}
                     onScroll={Animated.event(
                        [{nativeEvent : {
                           contentOffset : { x : scrollX}
                        }}],
                        {useNativeDriver : true}
                     )}
                  />
                  

                  <View>
                     <Text style={styles.title}>{trackTitle}</Text>
                     <Text style={styles.artist}>{trackArtist}</Text>
                  </View>
 
                  <View style={styles.progress}>
                     <Slider
                        style={styles.progressContainer}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor='#FFD369'
                        minimumTrackTintColor='#FFD369'
                        maximumTrackTintColor='#FFF'
                        onSlidingComplete={async(value) => await TrackPlayer.seekTo(value)}
                     />

                     <View style={styles.progressLabelContainer}>
                        <Text style={styles.progressLabelTxt}>{new Date(progress.position * 1000).toISOString().substring(19, 14)}</Text>
                        <Text style={styles.progressLabelTxt}>{new Date(progress.duration * 1000).toISOString().substring(19, 14)}</Text>
                     </View>
                  </View>

                  <View style={styles.musicControls}>
                     <TouchableOpacity onPress={skipToPrevious}>
                        <Ionicons name='play-skip-back-outline' size={35} color='#FFD369'/>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                        <Ionicons name={playbackState === State.Playing ? 'ios-pause-circle' : 'ios-play-circle'} size={75} color='#FFD369'/>
                     </TouchableOpacity>                     
                     <TouchableOpacity onPress={skipToNext}>
                        <Ionicons name='play-skip-forward-outline' size={35} color='#FFD369'/>
                     </TouchableOpacity>
                  </View>
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
      alignItems:'center',
      justifyContent:'center'
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