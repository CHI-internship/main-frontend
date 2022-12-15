import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from '../../components/auth';

const SignIn: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  });

  return <SignInForm />;
};

export default SignIn;
