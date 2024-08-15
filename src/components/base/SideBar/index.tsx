import Icon from '@/components/shared/Icon';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

interface Item {
  name: string;
  icon: JSX.Element;
  link: string;
}

const items = [
  {
    name: 'HOME',
    icon: <IonIcon name="home-outline"  />,
    link: '/',
  },
  {
    name: 'SETTINGS',
    icon: <IonIcon name="settings-outline" />,
    link: '/settings',
  },
] as const satisfies Item[];

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      {items.map((item) => (
        <Link className={styles.item} key={item.name} to={item.link}>
          <Icon icon={item.icon} size="lg" />
          <span>{item.name}</span>
        </Link>
      ))}
    </aside>
  );
}
