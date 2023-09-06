import { FirebaseAuthError } from '@/types/firebase';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from './firebase';
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const firebaseError = error as FirebaseAuthError;
      console.error('Error code:', firebaseError.code);
      console.error('Error message:', firebaseError.message);
    }

    throw error;
  }
};

// メールアドレスとパスワードでログイン
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const registerGoogleAccounts = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential === null) throw new Error('Google Login Error');
    const token = credential.accessToken;
    const user = result.user;
    console.log('Google Success', result);
    return { user, token };
  } catch (error: any) {
    // const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('Google Error', error);
    throw error;
  }
};
export const loginWithGoogleAccounts = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    console.log('Google Success', user);

    return user;
  } catch (error: any) {
    console.error('Google Login Error:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw error;
  }
};
