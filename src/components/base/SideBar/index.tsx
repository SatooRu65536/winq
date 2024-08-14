import Icon from '@/components/shared/Icon';
import styles from './index.module.scss';
import { HomeOutline, SettingsOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';

interface Item {
  name: string;
  icon: JSX.Element;
  link: string;
}

const items = [
  {
    name: 'HOME',
    icon: <HomeOutline />,
    link: '/',
  },
  {
    name: 'SETTINGS',
    icon: <SettingsOutline />,
    link: '/settings',
  },
] as const satisfies Item[];

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      {items.map((item) => (
        <Link className={styles.item} key={item.name} to={item.link}>
          <Icon icon={item.icon} size='lg' />
          <span>{item.name}</span>
        </Link>
      ))}
    </aside>
  );
}
