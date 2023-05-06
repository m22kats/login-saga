import { useState } from 'react';
import './login.css';
import { TextField } from '@src/@mui/mui.module';
import { Button } from '@src/@mui/mui.module';
import { loginActions } from '@src/redux/slices/auth/login/login.slice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const login = () => {
    const loginAction = loginActions.login({
      request: {
        username: username,
        password: password,
      },
    });
    dispatch(loginAction);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="container">
        <div className="container-item">
          <TextField
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            autoComplete="off"
            required
          />
        </div>
        <div className="container-item">
          <TextField
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            autoComplete="off"
            required
          />
        </div>
        <div className="container-item">
          <Button variant="contained" type="submit" className="login-btn">
            Log In
          </Button>
        </div>
      </div>
    </form>
  );
};
export default Login;
