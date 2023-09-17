import CloseSvg from "../atoms/CloseSvg";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: any;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    show && (
      <div
        id="popup-modal"
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
        onClick={onClose}
      >
        <div
          className="relative w-[90%] mx-auto bg-white rounded-lg shadow dark:bg-gray-700"
          onClick={preventPropagation}
        >
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <CloseSvg />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
