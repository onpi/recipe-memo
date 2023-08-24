import {
  registerUser,
  registerGoogleAccounts,
  signOutUser,
  loginWithEmail,
  loginWithGoogleAccounts,
} from '../model/accounts';
import { FirebaseAuthError } from '@/types/firebase';
import i18n from 'i18next';

class authHandlers {
  // メールアドレスとパスワードでユーザー登録
  static async signInWithEmailAndPassword(formData: {
    email: string;
    password: string;
  }) {
    const t = i18n.getFixedT(null, 'auth');
    console.log(formData);
    try {
      const user = await registerUser(formData.email, formData.password);
      console.log('User registered successfully:', user);
      return { success: true, data: user };
    } catch (error: unknown) {
      let errorMessage = t('signin.unknownError');
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const firebaseError = error as FirebaseAuthError;
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            errorMessage = t('signin.mailAlreadyUsed');
            break;
          case 'auth/weak-password':
            errorMessage = t('signin.eakPassword');
            break;
          case 'auth/invalid-email':
            errorMessage = t('signin.nvalidEmail');
            break;
          case 'auth/user-not-found':
            errorMessage = t('signin.serNotFound');
            break;
          case 'auth/user-disabled':
            errorMessage = t('signin.serDisabled');
            break;
          case 'auth/wrong-password':
            errorMessage = t('signin.wrongPassword');
            break;
          case 'auth/too-many-requests':
            errorMessage = t('signin.ooManyRequests');
            break;
          default:
            errorMessage = `${t('signin.unknownError')}: ${
              firebaseError.message
            }`;
        }
      }

      return { success: false, message: errorMessage };
    }
  }
  // メールアドレスとパスワードでログイン
  static async loginWithEmailAndPassword(formData: {
    email: string;
    password: string;
  }) {
    const t = i18n.getFixedT(null, 'auth');
    try {
      await loginWithEmail(formData.email, formData.password);
      return { success: true };
    } catch (error: unknown) {
      console.log(error);
      let errorMessage = t('login.unknownError');
      const firebaseError = error as FirebaseAuthError;
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = t('login.emailAlreadyUsed');
          break;
        case 'auth/weak-password':
          errorMessage = t('login.weakPassword');
          break;
        case 'auth/invalid-email':
          errorMessage = t('login.invalidEmail');
          break;
        case 'auth/user-not-found':
          errorMessage = t('login.userNotFound');
          break;
        case 'auth/user-disabled':
          errorMessage = t('login.userDisabled');
          break;
        case 'auth/wrong-password':
          errorMessage = t('login.wrongPassword');
          break;
        case 'auth/too-many-requests':
          errorMessage = t('login.tooManyRequests');
          break;
        default:
          errorMessage = `${t('login.unknownError')}: ${firebaseError.message}`;
      }
      return { success: false, message: errorMessage };
    }
  }

  // Googleアカウントでユーザー登録
  static async signInWithGoogle() {
    try {
      const result = await registerGoogleAccounts();
      return { success: true, data: result.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Googleアカウントでログイン
  static async loginWithGoogle() {
    try {
      const result = await loginWithGoogleAccounts();
      return { success: true, data: result.user };
    } catch (error: unknown) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }

  static async signOut() {
    try {
      await signOutUser();
      return { success: true };
    } catch (error: unknown) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }
}

export default authHandlers;
