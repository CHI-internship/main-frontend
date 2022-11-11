import { FC, useEffect } from 'react';
import SignUpForm from '../../components/auth/sign-up-form';
import { useNavigate } from 'react-router-dom';

const SignUp: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  });

  return <SignUpForm />;
};

export default SignUp;
