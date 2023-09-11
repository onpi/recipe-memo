import BottomNavigation from '../components/organism/BottomNavigation';
import ThemeToggle from '../components/ThemeToggle';
import authHandlers from '../handlers/authHandlers';
import { useNavigate } from 'react-router-dom';
import DotSvg from '@/components/atoms/DotSvg';
import { useRecipes } from '../context/RecipeContext';
import { useState } from 'react';
import CloseSvg from '@/components/atoms/CloseSvg';

const TopPage = () => {
  const navigate = useNavigate();
  const { recipeList } = useRecipes();
  const goToDetails = (id: string | undefined) => {
    // 詳細ページへの遷移処理（idはレシピのID）
    navigate(`/recipe/${id}`);
  };
  const editRecipe = () => {
    closeModal();
    if (!selectedRecipeId) return;
    navigate(`/recipe/edit/${selectedRecipeId}`);
  };

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleOptions = (recipeId: any) => {
    setSelectedRecipeId(recipeId);
    setShowPopup(true);
  };

  const closeModal = () => {
    setShowPopup(false);
  };

  const preventPropagation = (e: any) => {
    e.stopPropagation();
  };

  const getResipeTitleById = (id: string | undefined | null) => {
    if (!id) return;
    return recipeList.find((recipe) => recipe.id === id)?.title;
  };
  return (
    <>
      <div className="page-wrap container mx-auto px-4 pb-[104px]">
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
          {showPopup && (
            <div
              id="popup-modal"
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
              onClick={closeModal} // 背景をクリックしたときにモーダルを閉じる
            >
              <div
                className="relative w-[90%] mx-auto bg-white rounded-lg shadow dark:bg-gray-700"
                onClick={preventPropagation}
              >
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <CloseSvg />
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <div className="my-4">
                    <p>{getResipeTitleById(selectedRecipeId)}</p>
                  </div>
                  <button
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    onClick={() => console.log(`Delete: ${selectedRecipeId}`)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={editRecipe}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default TopPage;
