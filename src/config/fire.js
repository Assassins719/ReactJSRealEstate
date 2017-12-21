import firebase from 'firebase';

const config = {
  // apiKey: "AIzaSyCYWnWPIfj0JnSB1fqWQZg27VaafYnfDKo",
  // authDomain: "realtimechatreact.firebaseapp.com",
  // databaseURL: "https://realtimechatreact.firebaseio.com",
  // projectId: "realtimechatreact",
  // storageBucket: "realtimechatreact.appspot.com",
  // messagingSenderId: "468227521941"
  apiKey: 'AIzaSyCRi0aQz7iryoX_M8vk2OV_jikAJx73JO0',
  authDomain: 'homepointr-8cf6b.firebaseapp.com',
  databaseURL: 'https://homepointr-8cf6b.firebaseio.com',
  projectId: 'homepointr-8cf6b',
  storageBucket: 'homepointr-8cf6b.appspot.com',
  messagingSenderId: '804075633400'
};

const fbConfig = firebase.initializeApp(config);
export default fbConfig;
