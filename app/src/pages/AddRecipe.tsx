import BottomNavigation from '../components/BottomNavigation';
import ArrowSvg from '../components/atoms/ArrowSvg';
import { Link } from 'react-router-dom';

const AddRecipe = () => {
  return (
    <>
      <div className="header product_header py-4 relative flex justify-between">
        <div className="left flex">
          <Link to="/" className="w-6 h-6 flex items-center justify-center">
            <ArrowSvg />
          </Link>
          <div className="w-6 h-6"></div>
        </div>
        <div className="center flex-1 truncate">
          <h1 className="header_title product_header_title text-center text-normal font-bold">
            新規作成
          </h1>
        </div>
        <div className="right flex">
          <div className="w-6 h-6"></div>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default AddRecipe;
