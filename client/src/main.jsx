import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage, LoginPage, RegisterPage, DashboardPage, DataUser, DataAlternatif, DataKriteria, PenilaianAlternatif, ProsesPerhitungan, DataHasilKeputusan, ManagementData} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage/>,
  },
  {
    path: '/users',
    element: <DataUser/>,
  },
  {
    path: '/alternatif',
    element: <DataAlternatif />,
  },
  {
    path: '/kriteria',
    element: <DataKriteria />,
  },
  {
    path: '/penilaian',
    element: <PenilaianAlternatif />,
  },
  {
    path: '/perhitungan',
    element: <ProsesPerhitungan />,
  },
  {
    path: '/hasil',
    element: <DataHasilKeputusan />,
  },
  {
    path: '/management',
    element: <ManagementData />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
