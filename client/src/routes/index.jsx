import AuthLayout from '@layouts/AuthLayout';
import MainLayout from '@layouts/MainLayout';
import AuthPage from '@pages/Auth';

import Home from '@pages/Home';

import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
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
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
