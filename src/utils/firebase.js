import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBfiINcvYTmYkcgy4kju3WxwrGq6EC06Rw",
  authDomain: "todo-688fb.firebaseapp.com",
  databaseURL: "https://todo-688fb.firebaseio.com",
  projectId: "todo-688fb",
  storageBucket: "todo-688fb.appspot.com",
  messagingSenderId: "344534135208",
  appId: "1:344534135208:web:459d39a3290fc5adf1ad9d",
};

export default firebase.initializeApp(firebaseConfig);
