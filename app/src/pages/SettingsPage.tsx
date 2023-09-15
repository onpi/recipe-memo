import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/organism/BottomNavigation';
import Header from '@/components/organism/Header';
import authHandlers from '@/handlers/authHandlers';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const SettingsPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const signOut = async (e: any) => {
    e.preventDefault();
    const result = await authHandlers.signOut();
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <>
      <Header title="設定" />
      <div className="container mx-auto mt-[72px] pb-[104px]">
        <div className="setting">
          <div className="user_card bg-white p-4 rounded-lg shadow-custom-orange flex items-center mx-4">
            <div className="user_card__icon">
              <img
                src={userInfo?.photoURL}
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
          <button
            className="settings_btn w-full px-4 py-3 text-lg border-gray-300 shadow-md text-left mt-2"
            onClick={async (e) => signOut(e)}
          >
            ログアウト
          </button>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default SettingsPage;
