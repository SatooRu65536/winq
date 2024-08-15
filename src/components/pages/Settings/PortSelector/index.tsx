import { portsAtom, selectedPortAtom } from '@/stores/portAtom';
import { useAtom } from 'jotai';
import { commands } from '@/types/bindings';
import styles from './index.module.scss';
import { useEffect } from 'react';

export default function SettingsPortSelector() {
  const [ports, setPorts] = useAtom(portsAtom);
  const [selectedPort, setSelectedPort] = useAtom(selectedPortAtom);

  useEffect(() => {
    (async () => {
      const portsSnap = await commands.findPort();
      setPorts(portsSnap);
    })();
  }, []);

  return (
    <section className={styles.port_selector}>
      <p>{`選択: ${selectedPort ?? '未選択'}`}</p>

      <ul>
        {ports.map((port) => (
          <li key={port} onClick={() => setSelectedPort(port)}>
            {port}
          </li>
        ))}
      </ul>
    </section>
  );
}
