import GetFormDataFunc from 'src/types/form';
import LoginForm from '../components/LoginForm';
import registerUser from '../model/accounts';
import { FirebaseAuthError } from '@/types/firebase';
import { useTranslation } from 'react-i18next';

const SignInPage = () => {
  const { t } = useTranslation('auth');
  const handleSignIn = async (formData: {
    email: string;
    password: string;
  }) => {
    console.log(formData);
    try {
      const user = await registerUser(formData.email, formData.password);
      console.log('User registered successfully:', user);
      // 任意の後続の処理
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const firebaseError = error as FirebaseAuthError;
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            console.log(t('emailAlreadyInUse'));
            break;
          case 'auth/weak-password':
            console.log(t('weakPassword'));
            break;
          case 'auth/invalid-email':
            console.log(t('invalidEmail'));
            break;
          case 'auth/user-not-found':
            console.log(t('userNotFound'));
            break;
          case 'auth/user-disabled':
            console.log(t('userDisabled'));
            break;
          case 'auth/wrong-password':
            console.log(t('wrongPassword'));
            break;
          case 'auth/too-many-requests':
            console.log(t('tooManyRequests'));
            break;
          default:
            console.log(t('unknownError'), firebaseError.message);
        }
      }
    }
  };
  return (
    <>
      <div className="page-wrap pt-16 flex flex-col items-center h-screen">
        <div className="logo">
          <div className="logo_wrap">
            <div className="logo_image flex items-center justify-center">
              <img src={`/images/logo.svg`} />
            </div>
            <p className="logo_text text-base mt-4">Welcome to Recipe Memo</p>
          </div>
        </div>
        <LoginForm
          renderButton={(getFormData: GetFormDataFunc) => (
            <button
              type="submit"
              className="base_btn w-full p-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleSignIn(getFormData());
              }}
            >
              サインイン
            </button>
          )}
        />

        <p className="my-2">or</p>
        <div className="google_wrap px-4">
          <a href="">
            <div className="image_wrap">
              <img src={`/images/google_signin.svg`} alt="" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
