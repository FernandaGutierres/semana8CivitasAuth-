import { useState, useEffect } from 'react';

export const useEmailValidation = (email: string) => {
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (email.length > 5) {
      setIsValidating(true);
      const timer = setTimeout(() => {
        // Simula validación en base de datos de CivitasAuth
        setIsValidating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [email]);

  return { isValidating };
};
