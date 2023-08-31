interface BaseTextareaProps {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  cols?: number; // 新しく追加
  rows?: number; // 新しく追加
}

const BaseTextarea: React.FC<BaseTextareaProps> = ({
  placeholder,
  value,
  onChange,
  className,
  cols = 20,
  rows = 5,
}) => {
  return (
    <>
      <textarea
        name=""
        id=""
        cols={cols}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded ${className}`}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default BaseTextarea;
