import {
  collection,
  query,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  orderBy,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { database } from './config';

export const getPosts = (callback, clear) => {
  onSnapshot(query(collection(database, 'posts'), orderBy('created', 'desc')), (snapshot) => {
    clear();
    snapshot.docs.forEach((document) => {
      const data = document.data();
      callback({ id: document.id, ...data });
    });
  });
};

export const upadate = async (id, text) => {
  await setDoc(doc(database, 'posts', id), { text }, { merge: true });
};

export const insert = async (data) => {
  await addDoc(collection(database, 'posts'), data);
};

export const remove = async (id) => deleteDoc(doc(database, 'posts', id));

export const addLike = async (id, userId) => {
  await updateDoc(doc(database, 'posts', id), {
    likes: arrayUnion(userId),
  });
};

export const removeLike = async (id, userId) => {
  await updateDoc(doc(database, 'posts', id), {
    likes: arrayRemove(userId),
  });
};
