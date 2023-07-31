import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App;
