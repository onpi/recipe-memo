import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopPage from '../pages/TopPage';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<TopPage />} />
  </Routes>
);

export default RoutesConfig;
