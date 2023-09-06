import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './locales/i18n';
// import AuthProvider from './AuthProvider';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
