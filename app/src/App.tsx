import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './locales/i18n';
// import AuthProvider from './AuthProvider';
import { AuthProvider } from './context/AuthContext';
import { BaseProvider } from './context/BaseContext';

function App() {
  return (
    <Router>
      <BaseProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BaseProvider>
    </Router>
  );
}

export default App;
