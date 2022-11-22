import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '../../components/auth';

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
