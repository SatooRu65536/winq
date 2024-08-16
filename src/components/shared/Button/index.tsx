import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
  const { className, ...rest } = props;
  return <button className={`${styles.button} ${className}`} {...rest} />;
}
