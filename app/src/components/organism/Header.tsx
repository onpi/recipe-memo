import ArrowSvg from '../atoms/ArrowSvg';
import { Link } from 'react-router-dom';
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="header product_header py-4 relative flex justify-between">
          <div className="left flex">
            <Link to="/" className="w-6 h-6 flex items-center justify-center">
              <ArrowSvg />
            </Link>
            <div className="w-6 h-6"></div>
          </div>
          <div className="center flex-1 truncate">
            <h1 className="header_title product_header_title text-center text-normal font-bold">
              {title}
            </h1>
          </div>
          <div className="right flex">
            <div className="w-6 h-6"></div>
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
