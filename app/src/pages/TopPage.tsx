import BottomNavigation from '../components/organism/BottomNavigation';
import ThemeToggle from '../components/ThemeToggle';
import authHandlers from '../handlers/authHandlers';
import { useNavigate } from 'react-router-dom';
import DotSvg from '@/components/atoms/DotSvg';
import { useRecipes } from '../context/RecipeContext';

const TopPage = () => {
  const navigate = useNavigate();
  const { recipeList } = useRecipes();
  const goToDetails = (id: string | undefined) => {
    // 詳細ページへの遷移処理（idはレシピのID）
    navigate(`/recipe/${id}`);
  };

  const handleOptions = (id: string | undefined) => {
    // オプションボタンがクリックされたときの処理
    console.log(`Options for recipe ${id}`);
  };

  return (
    <>
      <div className="page-wrap container mx-auto px-4">
        <ThemeToggle />

        <a
          href="#"
          onClick={async (e) => {
            e.preventDefault();
            const result = await authHandlers.signOut();
            console.log(result);

            // ログアウトが成功したら/loginへリダイレクト
            navigate('/login');
          }}
        >
          <div className="image_wrap">サインアウト</div>
        </a>

        <div className="recipe_list mt-6">
          {recipeList.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe_item flex justify-between items-center py-3 px-2 shadow-md mt-4"
            >
              <button
                onClick={() => goToDetails(recipe.id)}
                className="recipe_list_item_title base_text flex-grow text-base text-left"
              >
                {recipe.title}
              </button>
              <button
                className="recipe_list_item_options w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptions(recipe.id);
                }}
              >
                <DotSvg />
              </button>
            </div>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default TopPage;
