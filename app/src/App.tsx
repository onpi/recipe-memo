import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './locales/i18n';
import AuthProvider from './AuthProvider';

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
