import { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  title: string;
  message: ReactNode;
  extra?: ReactNode;
}

export default function ErrorBoundaryBody(props: Props) {
  const { extra, title, message } = props;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>

        <div>
          {extra !== undefined ? (
            extra
          ) : (
            <a color="red" href="/" title="トップページに遷移する">
              トップに戻る
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
