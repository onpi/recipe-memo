import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHandlers from '../handlers/authHandlers';

export const useAuthForm = (authType: 'login' | 'signin') => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<string>('');

  const authStatus = (result: any) => {
    if (result.success) {
      navigate('/');
    } else {
      setErrorMessages(result.message);
    }
  };

  const handleSubmit = async (getFormData: any) => {
    let result;
    if (authType === 'login') {
      result = await authHandlers.loginWithEmailAndPassword(getFormData());
    } else {
      result = await authHandlers.signInWithEmailAndPassword(getFormData());
    }
    authStatus(result);
  };

  const handleSocialAuth = async () => {
    let result;
    if (authType === 'login') {
      result = await authHandlers.loginWithGoogle();
    } else {
      result = await authHandlers.signInWithGoogle();
    }
    authStatus(result);
  };

  return { errorMessages, handleSubmit, handleSocialAuth };
};
