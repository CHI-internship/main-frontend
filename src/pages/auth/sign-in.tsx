import { FC, useEffect } from 'react';
import SignInForm from '../../components/auth/sign-in-form';
import { useNavigate } from 'react-router-dom';

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
