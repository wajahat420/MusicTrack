import React,{useEffect} from 'react'
import { View, Text, PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Firebase from '../config/firebase';

// const reference = storage().ref();

export default function AddSong() {
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
      console.log("GRANT", granted)

      const file = await DocumentPicker.pickSingle();
      const path = file.uri

      console.log("PATH", file)

      const result = await RNFetchBlob.fs.readFile(path, 'base64')

      saveFile(result, file)
         
   }


   const saveFile = (result, file) => {
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
            });
         }
      );

   }

   useEffect(() => {
      try{


         database()
         .ref('/songs')
         .set({
            userID: 1,
            trackID: 2,
            songURL : '123'
         })
         .then(() => console.log('Data set.'));
   

      }catch(err){
         console.log(err)
      }
      }, [])

   return (
   <View>
         <Text></Text>
   </View>
   )
}
