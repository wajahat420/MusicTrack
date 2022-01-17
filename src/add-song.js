import React,{useEffect, useState} from 'react'
import { View, Text, PermissionsAndroid, ActivityIndicator, ToastAndroid , TextInput, TouchableOpacity, Image } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Firebase from '../config/firebase';


export default function AddSong({route, navigation}) {
   const [loading, setLoasing] = useState(false)
   const [song, setSong] = useState([])

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

      const file = await DocumentPicker.pickMultiple();
      setSong(file)
         
   }

   const createPlaylist = () => {
      song.forEach(async (elem, index)=> {
         setLoasing(true)
         const result = await RNFetchBlob.fs.readFile(elem.uri, 'base64')

         saveFile(result, elem, index+1)
      })
      

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
               addToDB(file.name, downloadURL, file?.song,index)
               ToastAndroid.show(`file uploaded`, ToastAndroid.SHORT)
               
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

   const addToDB = (name, songURL, imgURL, index) => {
      database()
         .ref('/songs')
         .push({
            userID: 2,
            songURL : songURL,
            imgURL : imgURL || '',
            trackID : route.params.trackID,
            trackName : route.params.trackName,
            songName : name
         })
      .then(() =>  {
         setLoasing(false)
         if(index == song.length){
            navigation.navigate("tracks", "refresh")
         }
      })
      .catch(err => console.log(err))
   }

   // useEffect(() => {
   //    try{

   //    // addSongData()

   

   //    }catch(err){
   //       console.log(err)
   //    }
   //    }, [])

   // console.log("SONG",song)

   return (
      <View style={{flex:1, backgroundColor:'#222831', paddingTop:30,paddingHorizontal:20}}>

      {loading &&
         <View style={{position:'absolute', left:0,top:0,bottom:0, right:0,alignItems:'center',alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator style={{marginTop:-20}} size={60}/>
         </View>
      }
         {/* <Text style={{color:"white", fontSize:25,marginBottom:10}}>Artist name</Text>
         <TextInput onChangeText={(text) => setArtist(text)} placeholderTextColor="gray" style={{borderColor:'white',borderWidth:1, color:'white', fontSize:25,padding:10,marginBottom:15}} placeholder="artist name here."/>
          */}
         <Text style={{color:"white", fontSize:25,marginBottom:10}}>Songs</Text>

         {
            song.length !== 0
            &&
            song.map((elem,index) => (
               <View key={index} style={{padding:10, flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                  <Text style={{color:"white", fontSize:20}}>{index+1}{"  -  "}{elem.name}</Text>

                  { elem.song
                     ?
                     <Image style={{width:50, height:50}} source={{uri:elem.song}}/>
                     :
                     <TouchableOpacity style={{backgroundColor:'gray',marginTop:5,paddingVertical:5,paddingHorizontal:10,borderRadius:10}} onPress={() => uploadImg(index)}>
                        <Text style={{color:'white', fontSize:12, textAlign:'center'}}>Upload Image</Text>
                     </TouchableOpacity>
                  }
               </View>
            ))
         }

         <TouchableOpacity onPress={UploadFile}  style={{backgroundColor:'brown',padding:10,marginTop:20}}>
            <Text style={{color:'white', textAlign:'center', fontSize:22}}>Upload Files</Text>
         </TouchableOpacity>

            <TouchableOpacity onPress={createPlaylist}  style={{backgroundColor:'brown',padding:10,marginTop:20, position:'absolute', bottom:10,left:20, right:20, width:'100%'}}>
               <Text style={{color:'white', textAlign:'center', fontSize:22}}>Create</Text>
            </TouchableOpacity>
      </View>
   )
}
