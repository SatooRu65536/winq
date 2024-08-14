import { cloneElement, ReactElement, useMemo } from 'react';
import styles from './index.module.scss';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  icon: ReactElement;
  padding?: boolean;
  size?: IconSize;
}

export default function Icon(props: Props) {
  const { icon, padding, size } = props;

  const sizeClassName = useMemo(() => {
    switch (size) {
      case 'xs':
        return styles.xs;
      case 'sm':
        return styles.sm;
      case 'md':
        return styles.md;
      case 'lg':
        return styles.lg;
      case 'xl':
        return styles.xl;
      default:
        return '';
    }
  }, []);

  return cloneElement(icon, {
    className: `${styles.icon} ${sizeClassName} ${padding !== false && styles.padding}`,
  });
}
