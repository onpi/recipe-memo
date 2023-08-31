import BaseInput from '../atoms/BaseInput';
import BaseTextarea from '../atoms/BaseTextarea';

interface InputAndTextareaProps {
  inputPlaceholder: string;
  inputValue: string;
  onChangeInput: (newValue: string) => void;
  textareaPlaceholder: string;
  textareaValue: string;
  onChangeTextarea: (newValue: string) => void;
}

const InputAndTextarea: React.FC<InputAndTextareaProps> = ({
  inputPlaceholder,
  inputValue,
  onChangeInput,
  textareaPlaceholder,
  textareaValue,
  onChangeTextarea,
}) => {
  return (
    <>
      <BaseInput
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={onChangeInput}
      />
      <BaseTextarea
        placeholder={textareaPlaceholder}
        value={textareaValue}
        onChange={onChangeTextarea}
        className="mt-2"
      />
    </>
  );
};

export default InputAndTextarea;
