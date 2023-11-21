import AuthLayout from '@layouts/AuthLayout';
import MainLayout from '@layouts/MainLayout';
import AuthPage from '@pages/Auth';

import Home from '@pages/Home';

import NotFound from '@pages/NotFound';
import PostDetail from '@pages/PostDetail';
import VerifySuccess from '@pages/VerifySuccess';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/auth',
    name: 'Auth',
    protected: false,
    component: AuthPage,
    layout: AuthLayout,
  },
  {
    path: '/verify-success',
    name: 'VerifySuccess',
    protected: false,
    component: VerifySuccess,
    layout: MainLayout,
  },
  {
    path: '/post/:postId',
    name: 'PostDetail',
    protected: false,
    component: PostDetail,
    layout: MainLayout,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
