import Icon from '@/components/shared/Icon';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { sidebarItems } from '@/router';

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      {sidebarItems.map((item) => (
        <Link className={styles.item} key={item.name} to={item.path}>
          <Icon icon={item.icon} size="lg" />
          <span>{item.name}</span>
        </Link>
      ))}
    </aside>
  );
}
