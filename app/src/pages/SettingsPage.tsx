import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/organism/BottomNavigation';
import Header from '@/components/organism/Header';
import authHandlers from '@/handlers/authHandlers';
import ThemeToggle from '@/components/ThemeToggle';

const SettingsPage = () => {
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
          <ThemeToggle />
          <button
            className="settings_btn w-full px-4 py-3 text-lg border-gray-300 shadow-md text-left mt-2"
            onClick={async (e) => signOut(e)}
          >
            ログアウト
          </button>
          <button className="settings_btn w-full px-4 py-3 text-lg border-gray-300 shadow-md text-left mt-2">
            アカウント削除
          </button>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default SettingsPage;
