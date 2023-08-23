import { Routes, Route } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import NotFound from '../pages/404';
import SignInPage from '../pages/SignInPage';
import LoginPage from '../pages/LoginPage';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<TopPage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/login" element={<LoginPage />} />
    {/* ここに追加していく */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesConfig;
