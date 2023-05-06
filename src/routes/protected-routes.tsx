import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginSelector } from '../redux/slices/auth/login/login.selector';
import { useEffect } from 'react';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(loginSelector.isLogIn);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  return <Outlet />;
};
export default ProtectedRoutes;
