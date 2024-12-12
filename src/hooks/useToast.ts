import { useState, useCallback } from 'react';

export function useToast() {
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

  const hideToast = useCallback(() => {
    setToast({ type: 'success', message: '', isVisible: false });
  }, []);

  return { toast, showToast, hideToast };
}
