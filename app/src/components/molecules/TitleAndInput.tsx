import { useState } from 'react';
import BaseHeadTitle from '../atoms/BaseHeadTitle';
import BaseInput from '../atoms/BaseInput';

interface TitleAndInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
}

const TitleAndInput: React.FC<TitleAndInputProps> = ({
  title,
  placeholder,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <BaseHeadTitle title={title} />
      <BaseInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2"
      />
    </>
  );
};

export default TitleAndInput;
