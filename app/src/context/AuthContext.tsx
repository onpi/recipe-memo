import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../model/firebase';
import { useLocation } from 'react-router-dom';
type AuthContextType = {
  uid: string | null;
};

// デフォルト値はnullとする
export const AuthContext = createContext<AuthContextType>({ uid: null });

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Firebaseなどからuidを取得するロジック
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
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

  return (
    <AuthContext.Provider value={{ uid }}>{children}</AuthContext.Provider>
  );
};

// 独自Hookを作成
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
