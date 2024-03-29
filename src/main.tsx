import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { Cart } from './pages/Cart';
import './index.css';
import { LayoutMenu } from './layout/Menu';
import { Product } from './pages/Product';
import { PREFIX } from './helpers/API';
import { LayoutAuth } from './layout/Auth';
import { RegisterPage } from './pages/RegisterPage';
import { RequireAuth } from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Success } from './pages/Success';

const Menu = lazy(() => import('./pages/Menu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><LayoutMenu/></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/product/:id',
        element: <Product/>,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
              })
          });
        }
      },
      {
        path: '/success',
        element: <Success/>
      }
  ]},
  { 
    path: '*',
    element: <RequireAuth><LayoutMenu/></RequireAuth>,
    children: [
      {
        path: '*',
        element: <Menu/>
      }]
  },
  {
    path: '/auth',
    element: <LayoutAuth/>,
    children: [
      {
        path: '/auth',
        element: <LoginPage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'register',
        element: <RegisterPage/>
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

