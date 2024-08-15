import { portsAtom } from '@/stores/portAtom';
import { useAtom } from 'jotai';
import { commands } from '@/types/bindings';
import styles from './index.module.scss';
import { useEffect } from 'react';

export default function SettingsPortSelector() {
  const [ports, setPorts] = useAtom(portsAtom);

  useEffect(() => {
    (async () => {
      const portsSnap = await commands.findPort();
      setPorts(portsSnap);

      let value = 0;
      setInterval(async () => {
        const res = await commands.dmxStart(portsSnap[0], value);
        console.log(res);
        value += 1;
        value %= 256;
      }, 500);
    })();
  }, []);

  return (
    <section className={styles.port_selector}>
      <ul>
        {ports.map((port) => (
          <li key={port}>{port}</li>
        ))}
      </ul>
    </section>
  );
}
