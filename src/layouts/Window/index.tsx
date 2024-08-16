import TitleBar from '@/components/base/TitleBar';
import styles from './index.module.scss';
import { Outlet } from 'react-router-dom';

export default function WindowLayout() {
  return (
    <div className={styles.window}>
      <TitleBar />
      <Outlet />
    </div>
  );
}
