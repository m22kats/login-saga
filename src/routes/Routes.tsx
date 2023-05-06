import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './protected-routes';
import { useSelector } from 'react-redux';
import { loginSelector } from '@src/redux/slices/auth/login/login.selector';
import NavigationBar from '@src/features/layout/navigation-bar';
import Login from '@src/features/auth/login/login';
import PageAfterLogin from '@src/features/page-after-login/page-after-login';

function RouteList() {
  const isLogin = useSelector(loginSelector.isLogIn);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/pal" /> : <Login />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<PageAfterLogin />} />
          <Route path="/pal" element={<PageAfterLogin />} />
          <Route path="*" element={<Navigate to="/pal" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouteList;
