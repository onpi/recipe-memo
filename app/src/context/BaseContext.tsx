import Snackbar from '@/components/atoms/Snackbar';
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface BaseContextProps {
  snackbarInfo: {
    message: string;
    type: 'success' | 'error';
    show: boolean;
  };
  setSnackbarInfo: React.DispatchWithoutAction;
}

export const BaseContext = createContext<BaseContextProps | undefined>(
  undefined
);

interface RecipeProviderProps {
  children: ReactNode;
}

export const BaseProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: '',
    type: 'success',
    show: false,
  });

  const showSnackbar = (message: any, type: 'success' | 'error') => {
    setSnackbarInfo({ message, type, show: true });
  };

  const hideSnackbar = () => {
    setSnackbarInfo({ ...snackbarInfo, show: false });
  };

  useEffect(() => {
    if (snackbarInfo.show) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbarInfo]);

  return (
    <BaseContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        message={snackbarInfo.message}
        show={snackbarInfo.show}
        type={snackbarInfo.type}
      />
    </BaseContext.Provider>
  );
};

export const useBase = () => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
