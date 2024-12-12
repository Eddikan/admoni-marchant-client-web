import React, { createContext, useContext, useState, useCallback } from 'react';

// Toast context type
interface ToastContextType {
  showToast: (type: 'success' | 'error', message: string) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast component
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
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg transition-transform duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {message}
    </div>
  );
};

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setToast({ type, message, isVisible: true });
    setTimeout(() => {
      setToast({ type, message: '', isVisible: false });
    }, 3000); // Hide toast after 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
      />
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
