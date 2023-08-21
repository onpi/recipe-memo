import { Routes, Route } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import NotFound from '../pages/404';
import SignInPage from '../pages/SignInPage';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<TopPage />} />
    <Route path="/signin" element={<SignInPage />} />
    {/* ここに追加していく */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesConfig;
