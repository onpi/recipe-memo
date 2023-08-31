interface BaseInputProps {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
}

const BaseInput: React.FC<BaseInputProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded ${className}`}
      />
    </>
  );
};

export default BaseInput;
