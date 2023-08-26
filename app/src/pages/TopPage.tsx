import BottomNavigation from '../components/BottomNavigation';
import ThemeToggle from '../components/ThemeToggle';
import authHandlers from '../handlers/authHandlers';
import { useNavigate } from 'react-router-dom';

const TopPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <ThemeToggle />

      <a
        href="#"
        onClick={async (e) => {
          e.preventDefault();
          const result = await authHandlers.signOut();
          console.log(result);

          // ログアウトが成功したら/loginへリダイレクト
          navigate('/login');
        }}
      >
        <div className="image_wrap">サインアウト</div>
      </a>
      <BottomNavigation />
    </>
  );
};

export default TopPage;
