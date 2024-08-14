import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from './layouts/Base';
import ErrorBoundaryPage from './pages/ErrorBoundary';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);
