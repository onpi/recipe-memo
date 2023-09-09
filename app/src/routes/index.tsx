import { Routes, Route } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import NotFound from '../pages/404';
import SignInPage from '../pages/SignInPage';
import LoginPage from '../pages/LoginPage';
import AddRecipe from '../pages/AddRecipe';
import DetailPage from '../pages/DetailPage';
import { useAuth } from '@/context/AuthContext';
import { RecipeProvider } from '@/context/RecipeContext';

const RoutesConfig = () => {
  const { uid } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RecipeProvider userId={uid} fetchAll={true}>
            <TopPage />
          </RecipeProvider>
        }
      />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/add" element={<AddRecipe />} />
      <Route
        path="/recipe/:id"
        element={
          <RecipeProvider userId={uid} fetchAll={false}>
            <DetailPage />
          </RecipeProvider>
        }
      />
      {/* ここに追加していく */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
