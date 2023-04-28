import {
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

export const createUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// eslint-disable-next-line max-len
export const loginWithEmailAndPassword = async (email, password) => signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = async () => {
  const response = await signInWithPopup(auth, googleProvider);
  return {
    email: response.user.email,
    photoUrl: response.user.photoURL,
    id: response.user.uid,
  };
};
