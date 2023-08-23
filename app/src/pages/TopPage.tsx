import ThemeToggle from '../components/ThemeToggle';
import authHandlers from '../handlers/authHandlers';
import { useNavigate } from 'react-router-dom';

const TopPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <ThemeToggle />
      <div className="border border-gray-400 rounded-2xl p-2 m-2 flex justify-around items-center">
        <h1 className="text-3xl font-bold underline">Hello Tailwind CSS!</h1>
        <p className="m-0 text-gray-400">Tailwind CSSです</p>
        <button className="bg-gray-300 border-0 p-2 rounded-md hover:bg-gray-400 hover:text-white">
          ボタン
        </button>
      </div>
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
    </>
  );
};

export default TopPage;
