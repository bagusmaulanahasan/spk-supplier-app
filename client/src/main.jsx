import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginPage from './pages/login';
// import RegisterPage from './pages/register';
// import DashboardPage from './pages/dashboard';
// import ErrorPage from './pages/errorPage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LoginPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/login',
//     element: <LoginPage />,
//   },
//   {
//     path: '/register',
//     element: <RegisterPage />,
//   },
//   {
//     path: '/dashboard',
//     element: <DashboardPage/>,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </StrictMode>
);
