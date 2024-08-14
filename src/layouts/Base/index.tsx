import { Outlet } from 'react-router-dom';
import '@/styles/global.scss';
import { useEffect } from 'react';

export default function BaseLayout() {
  useEffect(() => {});

  return (
    <main>
      <Outlet />
    </main>
  );
}
