import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import database from "@react-native-firebase/database"

// const firebaseConfig = {
//         apiKey: "AIzaSyDtifQbLdReFHhJIxNvObOtpHtlpujdhK8",
//         authDomain: "my-project-1-5f5ff.firebaseapp.com",
//         databaseURL: "https://my-project-1-5f5ff.firebaseio.com",
//         projectId: "my-project-1-5f5ff",
//         storageBucket: "my-project-1-5f5ff.appspot.com",
//         messagingSenderId: "59396975914",
//         appId: "1:59396975914:web:b997603550bd7d1f81c253"
// };

const firebaseConfig = {
        apiKey: "AIzaSyDv3t-8mS2Obm2aj8Jjmrag316dlCF07Dg",
        authDomain: "amz-musik-app.firebaseapp.com",
        databaseURL: "https://amz-musik-app-default-rtdb.firebaseio.com",
        projectId: "amz-musik-app",
        storageBucket: "amz-musik-app.appspot.com",
        messagingSenderId: "755748277014",
        appId: "1:755748277014:web:ddde182aa378b2862e5e37",
        measurementId: "G-2QNB3VQYB8"
};
        
let Firebase = firebase.initializeApp(firebaseConfig);
        // Initialize Firebase
export default () => {
        return {Firebase, storage, database}
};