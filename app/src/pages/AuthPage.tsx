import { useTranslation } from 'react-i18next';
import { useAuthForm } from '../hooks/useAuthForm';
import { Link } from 'react-router-dom';

const AuthPage = ({ pageType }: { pageType: 'login' | 'signin' }) => {
  const { t } = useTranslation('ui');
  const { errorMessages, handleSocialAuth } = useAuthForm(pageType);

  return (
    <>
      <div className="page-wrap pt-16 flex flex-col items-center h-screen px-4 max-w-lg mx-auto">
        <div className="logo">
          <div className="logo_wrap">
            <div className="logo_image flex items-center justify-center">
              <img src={`/images/logo.svg`} />
            </div>
            <p className="logo_text base_text text-base mt-4">
              {t('auth.head')}
            </p>
          </div>
        </div>
        {errorMessages && <p className="text-red-500">{errorMessages}</p>}
        <div className="google_wrap mt-4">
          <a
            href="#"
            onClick={async (e) => {
              e.preventDefault();
              handleSocialAuth();
            }}
          >
            <div className="image_wrap">
              {pageType === 'login' ? (
                <img src={`/images/google_login.svg`} alt="" />
              ) : (
                <img src={`/images/google_signin.svg`} alt="" />
              )}
            </div>
          </a>
        </div>
        <div className="link_wrap mt-4">
          {pageType === 'login' ? (
            <p className="base_text">
              {t('noAccount')}
              <Link to="/signin" className="custom_link">
                {t('here')}
              </Link>
            </p>
          ) : (
            <p className="base_text">
              {t('signin.alreadyRegistered')}
              <Link to="/login" className="custom_link">
                {t('here')}
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default AuthPage;
