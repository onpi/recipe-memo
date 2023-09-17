import React from 'react';

interface BaseBtnProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const BaseBtn: React.FC<BaseBtnProps> = ({
  label,
  type = 'button',
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={`base_btn p-2 rounded-md ${className}`}
    >
      {label}
    </button>
  );
};

export default BaseBtn;
