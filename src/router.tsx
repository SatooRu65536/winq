import { createBrowserRouter, RouteObject } from 'react-router-dom';
import BaseLayout from './layouts/Base';
import IonIcon from '@reacticons/ionicons';
import ErrorBoundaryPage from './pages/ErrorBoundary';
import TopPage from './pages/Top';
import SettingsPage from './pages/Settings';
import SimpleControllerPage from './pages/SimpleController';
import DevicesPage from './pages/Devices';
import IoConnectionPage from './pages/IoConnection';
import FunctionsPage from './pages/Functions';

type PageItem = {
  name: string;
  icon: JSX.Element;
} & RouteObject;

export const sidebarItems = [
  {
    name: 'TOP',
    path: '/',
    icon: <IonIcon name="home-outline" />,
  },
  {
    name: 'SETTINGS',
    path: '/settings',
    element: <SettingsPage />,
    icon: <IonIcon name="settings-outline" />,
  },
  {
    name: 'DEVICES',
    path: '/devices',
    element: <DevicesPage />,
    icon: <IonIcon name="albums-outline" />,
  },
  {
    name: 'CONNECTION',
    path: '/connection',
    element: <IoConnectionPage />,
    icon: <IonIcon name="caret-down-circle-outline" />,
  },
  {
    name: 'FUNCTIONS',
    path: '/functions',
    element: <FunctionsPage />,
    icon: <IonIcon name="hardware-chip-outline" />,
  },
  {
    name: 'CONTROLLER',
    path: '/controll',
    element: <SimpleControllerPage />,
    icon: <IonIcon name="game-controller-outline" />,
  },
] satisfies PageItem[];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TopPage />,
  },
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: sidebarItems.filter((i) => i.element != undefined),
  },
]);
