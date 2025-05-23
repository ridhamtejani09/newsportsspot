import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page with signup tab active
    navigate('/login?tab=signup');
  }, [navigate]);

  return null;
};

export default SignUp;