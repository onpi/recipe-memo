import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { t } = useTranslation('ui');

  const setLightTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  };

  const setDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // ローカルストレージからテーマを取得
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme === 'dark') {
        setDarkTheme();
        setIsDarkMode(true);
        document
          .querySelector('meta[name="theme-color"]')!
          .setAttribute('content', '#303739');
      } else {
        setLightTheme();
        setIsDarkMode(false);
        document
          .querySelector('meta[name="theme-color"]')!
          .setAttribute('content', '#ff9500');
      }
    } else {
      // OSの設定に従う
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setDarkTheme();
        setIsDarkMode(true);
      } else {
        setLightTheme();
        setIsDarkMode(false);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };

  return (
    <div className="settings_btn w-full px-4 py-3 text-lg border-gray-300 shadow-md mt-2 flex justify-between items-center">
      <span>{t('settings.darkmode')}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <div
          className={`w-11 h-6 rounded-full transition-all ${
            isDarkMode ? 'bg-orange-500' : 'bg-gray-200'
          }`}
        >
          <div
            className={`absolute top-0.5 left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all transform ${
              isDarkMode ? 'translate-x-full' : 'translate-x-0'
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
