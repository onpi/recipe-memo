import SearchSvg from '../atoms/SearchSvg';
import { useTranslation } from 'react-i18next';

interface SeatchItemProps {
  value: string;
  onChange: (newValue: string) => void;
}

const SeatchItem: React.FC<SeatchItemProps> = ({ value, onChange }) => {
  const { t } = useTranslation(['ui', 'error']);
  return (
    <>
      <div className="search relative">
        <input
          type="text"
          className="w-full p-3 pr-9 border rounded-lg search_input"
          placeholder={t('ui:search')}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
        <button className="search_btn absolute right-0 top-1/2 transform -translate-y-1/2 w-10.5 h-10.5 flex items-center justify-center">
          <SearchSvg />
        </button>
      </div>
    </>
  );
};

export default SeatchItem;
