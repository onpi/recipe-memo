import { useEffect, useState } from 'react';
interface BaseInputProps {
  message: any;
  show: boolean;
  type: string;
}
const Snackbar: React.FC<BaseInputProps> = ({ message, show, type }) => {
  //   useEffect(() => {
  //     if (show) {
  //       const timer = setTimeout(() => {
  //         closeSnackbar();
  //       }, 3000); // 3秒後に消えるように設定

  //       return () => {
  //         clearTimeout(timer);
  //       };
  //     }
  //   }, [show, closeSnackbar]);
  useEffect(() => {
    if (type === 'success') {
      setBackgroundColor('bg-green-500');
    } else if (type === 'error') {
      setBackgroundColor('bg-red-500');
    }
  }, [type]);

  const [backgroundColor, setBackgroundColor] = useState('bg-green-500');

  return (
    <div
      className={`fixed top-16 left-0 right-0 mx-auto p-2 rounded text-white z-50 w-11/12 ${
        show ? 'block' : 'hidden'
      }  ${backgroundColor}`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
