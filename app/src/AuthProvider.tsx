import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from './model/firebase';
import { useLocation } from 'react-router-dom';

const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      console.log(user);
      if (user) {
        const uid = user.uid;
        console.log('uid', uid);
        if (location.pathname === '/login' || location.pathname === '/signin') {
          navigate('/');
        }
      } else {
        // /login または /signin ページでなければリダイレクトする
        if (location.pathname !== '/login' && location.pathname !== '/signin') {
          navigate('/login');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, location]);

  return <>{children}</>;
};

export default AuthProvider;
