import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBpll_BmObAmNyEvas87VDmwX4-RedQfbI',
  authDomain: 'social-network-533b1.firebaseapp.com',
  projectId: 'social-network-533b1',
  storageBucket: 'social-network-533b1.appspot.com',
  messagingSenderId: '918518352349',
  appId: '1:918518352349:web:0e9aaa3e707c7bcf2ace34',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
