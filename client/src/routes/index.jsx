import AuthLayout from '@layouts/AuthLayout';
import MainLayout from '@layouts/MainLayout';
import Admin from '@pages/Admin';
import AuthPage from '@pages/Auth';
import ChangePassword from '@pages/ChangePassword';
import CreatePost from '@pages/CreatePost';
import EditPost from '@pages/EditPost';
import EditProfile from '@pages/EditProfile';

import Home from '@pages/Home';

import NotFound from '@pages/NotFound';
import PostDetail from '@pages/PostDetail';
import Profile from '@pages/Profile';
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
  {
    path: '/post/create',
    name: 'CreatePost',
    protected: true,
    component: CreatePost,
    layout: MainLayout,
  },
  {
    path: '/post/edit/:postId',
    name: 'EditPost',
    protected: true,
    component: EditPost,
    layout: MainLayout,
  },
  {
    path: '/admin',
    name: 'Admin',
    protected: true,
    component: Admin,
    layout: MainLayout,
  },
  {
    path: '/profile/user/:username',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/profile/edit',
    name: 'EditProfile',
    protected: true,
    component: EditProfile,
    layout: MainLayout,
  },
  {
    path: '/profile/change-password',
    name: 'ChangePassword',
    protected: true,
    component: ChangePassword,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
