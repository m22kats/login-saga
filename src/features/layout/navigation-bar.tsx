import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/root-reducer';
import {
  Toolbar,
  AppBar,
  Drawer,
  Box,
  CssBaseline,
  Divider,
  List,
  ListItemButton,
  Typography,
  IconButton,
  CircularProgress,
} from '../../@mui/mui.module';
import { MenuIcon, LoginIcon, LogoutIcon } from '../../@mui/mui-icon.module';
import { useNavigate } from 'react-router-dom';
import { loginSelector } from '@src/redux/slices/auth/login/login.selector';
import { FetchStatusEnum } from '@src/services/fetch.type';
import { loginActions } from '@src/redux/slices/auth/login/login.slice';

const drawerWidth = 240;

export default function NavigationBar() {
  type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(loginSelector.isLogIn);
  const loginFetchStatus = useSelector(loginSelector.loginFetchStatus);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(loginActions.logout());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Login Saga
      </Typography>
      <Divider />
      <List>
        <ListItemButton
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loginFetchStatus === FetchStatusEnum.FETCHING ? (
            <CircularProgress size={20} color="inherit" />
          ) : isLogin ? (
            <LogoutIcon onClick={handleLogout} />
          ) : (
            <LoginIcon onClick={handleLogin} />
          )}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Login Saga
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}></Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {loginFetchStatus === FetchStatusEnum.FETCHING ? (
              <CircularProgress size={20} color="inherit" />
            ) : isLogin ? (
              <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleLogin} color="inherit">
                <LoginIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
