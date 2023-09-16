import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import Snackbar from '@/components/atoms/Snackbar';

interface BaseContextProps {
  snackbarInfo: {
    message: string;
    type: 'success' | 'error';
    show: boolean;
  };
  setSnackbarInfo: React.DispatchWithoutAction;
  showSnackbar: (message: string, type: 'success' | 'error') => void;
  hideSnackbar: () => void;
}

export const BaseContext = createContext<BaseContextProps | undefined>(
  undefined
);

interface BaseProviderProps {
  children: ReactNode;
}

export const BaseProvider: React.FC<BaseProviderProps> = ({ children }) => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: '',
    type: 'success',
    show: false,
  });

  const { i18n } = useTranslation();

  useEffect(() => {
    // Handle dark theme
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Handle language setting
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const showSnackbar = (message: string, type: 'success' | 'error') => {
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
    <BaseContext.Provider
      value={{ snackbarInfo, setSnackbarInfo, showSnackbar, hideSnackbar }}
    >
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
    throw new Error('useBase must be used within a BaseProvider');
  }
  return context;
};
