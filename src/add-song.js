import React,{useEffect, useState} from 'react'
import { View, Text, PermissionsAndroid, KeyboardAvoidingView, ActivityIndicator, ToastAndroid , TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Firebase from '../config/firebase';


export default function AddSong({route, navigation}) {
   const [loading, setLoasing] = useState(false)
   const [song, setSong] = useState([])
   const [dropdown, setDropdown] = useState(false)


   const {storage, database} = Firebase()

   async function UploadFile(){
         
      const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
         {
               title: "Request Storage Access",
               message:"Only CSV can be uploaded" ,
               buttonNeutral: "Ask Me Later",
               buttonNegative: "Cancel",
               buttonPositive: "OK"
         }
      )
      try{
         const file = await DocumentPicker.pickMultiple();
         setSong(file)
      }catch(err){
         console.log(error)
      }
         
   }

   const createPlaylist = () => {
      let error = false
      song.forEach(elem => {
         console.log("CHECKING", elem.genre, elem.artist)
         if(!elem.genre || !elem.artist){
          error = true
         }
      })
      console.log("ERROR", error)
      if(error){
         ToastAndroid.show("Check your Artist field and Genre", ToastAndroid.SHORT)
      }else{
         song.forEach(async (elem, index)=> {
            setLoasing(true)
            const result = await RNFetchBlob.fs.readFile(elem.uri, 'base64')
   
            saveFile(result, elem, index+1)
         })
      }

      

   }

   const  uploadImg = async(index) => {
      const file = await DocumentPicker.pickSingle();
      console.log(file)
      const result = await RNFetchBlob.fs.readFile(file.uri, 'base64')

      getImgURL(result, file, index)
   }


   const saveFile = (result, file, index) => {
      const uploadTask = storage().ref(`allFiles/${file.name}`).putString(result, 'base64', {contentType : file.type})

      uploadTask.on('state_changed',
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case 'paused':
               console.log('Upload is paused');
               break;
               case 'running':
               console.log('Upload is running');
               break;
            }
         }, 
         (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
               case 'storage/unauthorized':
               // User doesn't have permission to access the object
               break;
               case 'storage/canceled':
               // User canceled the upload
               break;

               // ...

               case 'storage/unknown':
               // Unknown error occurred, inspect error.serverResponse
               break;
            }
         }, 
         () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               console.log('File available at', downloadURL);
               addToDB(file.name, downloadURL, file?.song,index, file.genre, file.artist)
               
               
            });
         }
      );
   }
   const getImgURL = (result, file, index) => {
      const uploadTask = storage().ref(`allFiles/${file.name}`).putString(result, 'base64', {contentType : file.type})

      uploadTask.on('state_changed',
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case 'paused':
               console.log('Upload is paused');
               break;
               case 'running':
               console.log('Upload is running');
               break;
            }
         }, 
         (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
               case 'storage/unauthorized':
               // User doesn't have permission to access the object
               break;
               case 'storage/canceled':
               // User canceled the upload
               break;

               // ...

               case 'storage/unknown':
               // Unknown error occurred, inspect error.serverResponse
               break;
            }
         }, 
         () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               console.log('File available at', downloadURL);
               const dup = [...song]
               dup[index].song = downloadURL
               setSong(dup)
            });
         }
      );

   }

   const addToDB = (name, songURL, imgURL, index, genre, artist) => {
      database()
         .ref('/songs')
         .push({
            userID: 2,
            songURL : songURL,
            imgURL : imgURL || '',
            trackID : route.params.trackID,
            trackName : route.params.trackName,
            songName : name,
            artist,
            genre
         })
      .then(() =>  {
         setLoasing(false)
         if(index == song.length){
            navigation.navigate("tracks", "refresh")
            ToastAndroid.show(`file uploaded`, ToastAndroid.SHORT)
         }
      })
      .catch(err => console.log(err))
   }

   const setGenre = (index, text) => {
      const dup = [...song]
      dup[index].genre = text
      setSong(dup)
      setDropdown(-1)
   }

   const setArtist = (index, text) => {
      const dup = [...song]
      dup[index].artist = text
      setSong(dup)
   }

   return (
      <>
      {loading &&
         <View style={{position:'absolute', left:0,zIndex:200,top:0,bottom:0, right:0,alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator style={{marginTop:20}} size={60}/>
         </View>
      }
      <ScrollView style={{flex:1, height:'100%', backgroundColor:'#222831', paddingTop:30,paddingHorizontal:20}}>



      <View style={{flex:1, height:'100%', zIndex:100}}>
         <Text style={{color:"white", fontSize:25,marginBottom:10}}>Songs</Text>

         {
            song.length !== 0
            &&
            song.map((elem,index) => (
               <View key={index} style={{marginTop:15}}>
                  <View key={index} style={{padding:10, flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                     <Text numberOfLines={2}  style={{color:"white", fontSize:20, width:'65%'}}>{index+1}{"  -  "}{elem.name}</Text>

                     { elem.song
                        ?
                        <Image style={{width:50, height:50}} source={{uri:elem.song}}/>
                        :
                        <TouchableOpacity  style={{backgroundColor:'gray',marginTop:5,paddingVertical:5,paddingHorizontal:10,borderRadius:10,marginLeft:10}} onPress={() => uploadImg(index)}>
                           <Text style={{color:'white', fontSize:12, textAlign:'center'}}>Upload Image</Text>
                        </TouchableOpacity>
                     }

                  </View>

                  <View style={{paddingHorizontal:30,marginTop:10, flexDirection:'row', position:'relative'}}>
                     <TextInput onChangeText={text => setArtist(index, text)} placeholderTextColor="gray" placeholder="artist name" style={{width:'50%',fontSize:15,padding:10, height:45,color:'white', borderColor:'white', borderWidth:1}}/>

                     <TouchableOpacity onPress={() => setDropdown(dropdown == index ? -1 : index)} activeOpacity={.8} style={{ height:45,marginLeft:5, borderColor:'white', borderWidth:1, width:"50%",paddingHorizontal:5, alignItems:'center',justifyContent:'center'}}>
                        <Text numberOfLines={1} style={{color:'gray'}}>{elem.genre ||  'Genre'}</Text>
                     </TouchableOpacity>

                     {dropdown==index ?

                     <View style={{position:'absolute', right:25, top:60,zIndex:5,backgroundColor:'gray',borderColor:'white', borderWidth:1, width:"50%"}}>
                        <TouchableOpacity onPress={() => setGenre(index, 'Ambiente-Musik')} style={{height:40, borderColor:'white', borderBottomWidth:1, alignItems:'center',justifyContent:'center'}}>
                           <Text style={{color:'black', fontSize:10}}>Ambiente-Musik</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setGenre(index, 'Entspannungsmusik')} style={{height:40, borderColor:'white', borderBottomWidth:1, alignItems:'center',justifyContent:'center'}}>
                           <Text style={{color:'black', fontSize:10}}>Entspannungsmusik</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => setGenre(index, 'Wellness-Musik')} style={{height:40, borderColor:'white', borderBottomWidth:1, alignItems:'center',justifyContent:'center'}}>
                           <Text style={{color:'black', fontSize:10}}>Wellness-Musik</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setGenre(index, 'Musik für Yoga und Pilates')} style={{height:40, borderColor:'white', borderBottomWidth:1, alignItems:'center',justifyContent:'center'}}>
                           <Text style={{color:'black', fontSize:10}}>Musik für Yoga und Pilates</Text>
                        </TouchableOpacity>
                     </View>
                     :
                     <></>
                     }
                  </View>
               </View>
            ))
         }
         <TouchableOpacity onPress={UploadFile}  style={{backgroundColor:'brown',padding:10,marginTop:40}}>
            <Text style={{color:'white', textAlign:'center', fontSize:22}}>Upload Files</Text>
         </TouchableOpacity>
         <View style={{height:100}}/>
      </View>
      
       


      </ScrollView>
            <TouchableOpacity onPress={createPlaylist}  style={{backgroundColor:'brown',padding:10,marginTop:20, position:'absolute', bottom:10,left:20, right:20}}>
               <Text style={{color:'white', textAlign:'center', fontSize:22}}>Create</Text>
            </TouchableOpacity>
      </>
   )
}
