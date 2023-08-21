import { FirebaseAuthError } from '@/types/firebase';
import { auth, createUserWithEmailAndPassword } from './firebase';
const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const firebaseError = error as FirebaseAuthError;
      console.error('Error code:', firebaseError.code);
      console.error('Error message:', firebaseError.message);
    }

    throw error;
  }
};

export default registerUser;
