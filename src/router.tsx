import { createBrowserRouter, RouteObject } from 'react-router-dom';
import BaseLayout from './layouts/Base';
import IonIcon from '@reacticons/ionicons';
import ErrorBoundaryPage from './pages/ErrorBoundary';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import SimpleControllerPage from './pages/SimpleController';

type PageItem = {
  name: string;
  icon: JSX.Element;
} & RouteObject;

export const sidebarItems = [
  {
    name: 'HOME',
    path: '/',
    element: <HomePage />,
    icon: <IonIcon name="home-outline" />,
  },
  {
    name: 'SETTINGS',
    path: '/settings',
    element: <SettingsPage />,
    icon: <IonIcon name="settings-outline" />,
  },
  {
    name: 'SIMPLE CONTROLLER',
    path: '/simple-controll',
    element: <SimpleControllerPage />,
    icon: <IonIcon name="game-controller-outline" />,
  },
] as const satisfies PageItem[];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: sidebarItems,
  },
]);
