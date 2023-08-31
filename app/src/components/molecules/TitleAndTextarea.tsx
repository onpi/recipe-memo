import { useState } from 'react';
import BaseHeadTitle from '../atoms/BaseHeadTitle';
import BaseTextarea from '../atoms/BaseTextarea';

interface TitleAndTextareaProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
}

const TitleAndTextarea: React.FC<TitleAndTextareaProps> = ({
  title,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <BaseHeadTitle title={title} />
      <BaseTextarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2"
      />
    </>
  );
};

export default TitleAndTextarea;
