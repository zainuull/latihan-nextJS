import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import app from './init';
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);

export async function getData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function getDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function getAccount(userData:{email:string}) {
  const obj = query(collection(firestore, 'users'), where('email', '==', userData.email));
  const snapshot = await getDocs(obj)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  if(data) {
    return data[0]
  } else {
    return null
  }
}

export async function createAccount(userData: { email: string; fullName: string; password: string; role?: string }, callback: Function) {
  const obj = query(collection(firestore, 'users'), where('email', '==', userData.email));
  const snapshot = await getDocs(obj);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));


  if (data.length > 0) {
    callback({ status: false, message: 'Email sudah terdaftar' });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = 'member';
    await addDoc(collection(firestore, 'users'), userData)
      .then(() => {
        callback({ status: true, message: 'Registrasi akun berhasil' });
      })
      .catch((err) => {
        callback({ status: true, message: err.message });
      });
  }
}
