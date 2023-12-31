import { Link, useLocation } from 'react-router-dom';
import TopIconSvg from '../navigation/TopIconSvg';
import AddIconSvg from '../navigation/AddIconSvg';
import SettingsIconSvg from '../navigation/SettingsIconSvg';
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {
  const { t } = useTranslation('ui');
  const location = useLocation();
  const isActive = (path: any) => location.pathname === path;

  return (
    <>
      <div className="navigation fixed bottom-0 w-full bg-white">
        <div className="navigation_wrap flex justify-between">
          <Link
            to="/"
            className="navigation_link flex-1 text-center py-2 flex flex-col justify-center"
          >
            <div className="navigation_item flex flex-col items-center">
              <div className="navigation_icon">
                <TopIconSvg
                  color={`var(--${
                    isActive('/') ? 'navigationActiveColor' : 'navigationColor'
                  })`}
                />
              </div>
              <div
                className={`navigation_text navigation_color text-xs mt-1 ${
                  isActive('/') ? 'active' : ''
                }`}
              >
                {t('bottomTab.home')}
              </div>
            </div>
          </Link>
          <Link
            to="/add"
            className="navigation_link flex-1 text-center py-2 flex flex-col items-center justify-center"
          >
            <div className="navigation_item flex">
              <div className="navigation_icon">
                <AddIconSvg color="#9E9E9E" />
              </div>
            </div>
          </Link>
          <Link
            to="/settings"
            className="navigation_link flex-1 text-center py-2"
          >
            <div className="navigation_item flex flex-col items-center">
              <div className="navigation_icon">
                <SettingsIconSvg
                  color={`var(--${
                    isActive('/settings')
                      ? 'navigationActiveColor'
                      : 'navigationColor'
                  })`}
                />
              </div>
              <div
                className={`navigation_text navigation_color text-xs mt-1 ${
                  isActive('/settings') ? 'active' : ''
                }`}
              >
                {t('bottomTab.settings')}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
