const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal-container bg-white w-1/2 md:w-1/3 mx-auto p-4 rounded shadow-lg z-50'>
        <button
          className='modal-close absolute top-0 right-0 p-4'
          onClick={onClose}>
          &times;
        </button>
        <div className='modal-content p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
