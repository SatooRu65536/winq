import { Outlet } from 'react-router-dom';
import SideBar from '@/components/base/SideBar';
import styles from './index.module.scss';
import '@/styles/global.scss';

export default function BaseLayout() {
  return (
    <>
      <SideBar />
      <main className={styles.main}>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}
