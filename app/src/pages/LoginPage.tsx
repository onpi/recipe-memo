import GetFormDataFunc from 'src/types/form';
import LoginForm from '../components/LoginForm';
import { useTranslation } from 'react-i18next';
import authHandlers from '../handlers/authHandlers';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const { t } = useTranslation('ui');
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<string>('');

  const loginStatus = (result: any) => {
    if (result.success) {
      navigate('/');
    } else {
      setErrorMessages(result.message);
    }
  };

  const submitLoginWithEmailAndPassword = async (
    getFormData: GetFormDataFunc
  ) => {
    const result = await authHandlers.loginWithEmailAndPassword(getFormData());
    console.log(result);
    loginStatus(result);
    if (result.success) {
      navigate('/');
    } else {
      setErrorMessages(result.message);
    }
  };

  const submitLoginWithGoogle = async () => {
    const result = await authHandlers.loginWithGoogle();
    loginStatus(result);
  };
  return (
    <>
      <div className="page-wrap pt-16 flex flex-col items-center h-screen px-4">
        <div className="logo">
          <div className="logo_wrap">
            <div className="logo_image flex items-center justify-center">
              <img src={`/images/logo.svg`} />
            </div>
            <p className="logo_text text-base mt-4">{t('signin.head')}</p>
          </div>
        </div>
        {/* errorMessagesを表示 */}
        {errorMessages && <p className="text-red-500">{errorMessages}</p>}
        <LoginForm
          renderButton={(getFormData: GetFormDataFunc) => (
            <button
              type="submit"
              className="base_btn w-full p-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                submitLoginWithEmailAndPassword(getFormData);
              }}
            >
              ログイン
            </button>
          )}
        />
        <p className="my-2">or</p>
        <div className="google_wrap">
          <a
            href="#"
            onClick={async (e) => {
              e.preventDefault();
              submitLoginWithGoogle();
            }}
          >
            <div className="image_wrap">
              <img src={`/images/google_signin.svg`} alt="" />
            </div>
          </a>
        </div>
        <div className="link_wrap mt-4">
          <p className="">
            {t('noAccount')}
            <Link to="/signin" className="custom_link">
              {t('here')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
