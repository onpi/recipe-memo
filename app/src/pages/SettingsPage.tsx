import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/organism/BottomNavigation';
import Header from '@/components/organism/Header';
import authHandlers from '@/handlers/authHandlers';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const SettingsPage = () => {
  const { t } = useTranslation('ui');

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const signOut = async (e: any) => {
    e.preventDefault();
    const result = await authHandlers.signOut();
    if (result.success) {
      navigate('/login');
    }
  };
  const { i18n } = useTranslation();

  // アプリケーションが読み込まれたときの処理
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); // 言語設定をローカルストレージに保存
  };

  return (
    <>
      <Header title={t('header.settings')} />
      <div className="container mx-auto mt-[72px] pb-[104px]">
        <div className="setting">
          <div className="user_card bg-white p-4 rounded-lg shadow-custom-orange flex items-center mx-4">
            <div className="user_card__icon">
              <img
                src={
                  userInfo?.photoURL ? userInfo?.photoURL : '/images/logo.svg'
                }
                alt="user icon"
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="ml-4">
              <div className="user_card__name text-lg font-semibold">
                {userInfo?.displayName}
              </div>
              <div className="user_card__email text-sm">{userInfo?.email}</div>
            </div>
          </div>
          <div className="mt-6"></div>
          <ThemeToggle />
          <select
            onChange={handleLanguageChange}
            value={i18n.language}
            className="settings_btn w-full px-4 py-3 text-lg border-gray-300 shadow-md text-left mt-2"
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
          <button
            className="settings_btn w-full px-4 py-3 text-lg border-gray-300 shadow-md text-left mt-2"
            onClick={async (e) => signOut(e)}
          >
            {t('settings.logout')}
          </button>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default SettingsPage;
