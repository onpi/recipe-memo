const ThemeToggle = () => {
  const setLightTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  };

  const setDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  };

  const setSystemPreference = () => {
    document.documentElement.classList.remove('dark'); // または、OSの設定に従う設定を行う
    localStorage.removeItem('theme');
  };

  return (
    <div>
      <button onClick={setLightTheme}>Light Mode</button>
      <button onClick={setDarkTheme}>Dark Mode</button>
      <button onClick={setSystemPreference}>Follow System</button>
    </div>
  );
};

export default ThemeToggle;
