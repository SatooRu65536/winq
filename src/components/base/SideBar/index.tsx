import Icon from '@/components/shared/Icon';
import styles from './index.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '@/router';

export default function SideBar() {
  const location = useLocation();

  const isActive = (path: string) => path != '/' && location.pathname.startsWith(path);

  return (
    <aside className={styles.sidebar}>
      {sidebarItems.map((item) => (
        <Link className={styles.link} data-active={isActive(item.path)} key={item.name} to={item.path}>
          <Icon icon={item.icon} size="lg" />
          <span>{item.name}</span>
        </Link>
      ))}
    </aside>
  );
}
