import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './locales/i18n';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
