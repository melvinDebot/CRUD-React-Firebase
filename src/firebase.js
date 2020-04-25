import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyC0Hd5UEEwQv5jg3sW7qyLvcfWkd4xLacU",
  authDomain: "fir-react-99ce5.firebaseapp.com",
  databaseURL: "https://fir-react-99ce5.firebaseio.com",
  projectId: "fir-react-99ce5",
  storageBucket: "fir-react-99ce5.appspot.com",
  messagingSenderId: "1058155210815",
  appId: "1:1058155210815:web:6a1b7b51c4b80bb219b08a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase