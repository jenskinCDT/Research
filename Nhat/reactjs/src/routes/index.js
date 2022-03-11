import { lazy } from 'react';

const Login = lazy(() => import('../pages/Login/Login'));
const Profile = lazy(() => import('../pages/auth/Profile/Profile'));
const Home = lazy(() => import('../pages/Home/Home'));

export const routes = [
  {
    path: '/',
    exact: true,
    protected: false,
    title: 'Trang chủ',
    component: Home,
  },

  {
    path: '/login',
    exact: true,
    protected: false,
    title: 'Đăng nhập',
    component: Login,
  },

  {
    path: '/profile',
    exact: true,
    // roles: ['xizot'],
    protected: true,
    title: 'Trang cá nhân',
    component: Profile,
  },
];
