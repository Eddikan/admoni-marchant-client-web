const Toast = ({
    message,
    type,
    isVisible,
  }: {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }) => {
    return (
      <div
        className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg transition-transform duration-300 transform ${
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        } ${
          type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {message}
      </div>
    );
  };
  
  export default Toast;
  