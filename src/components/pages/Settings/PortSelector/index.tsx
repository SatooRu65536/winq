import { deviceAtom, selectedPortAtom } from '@/stores/deviceAtom';
import { useAtom } from 'jotai';
import { commands } from '@/types/bindings';
import styles from './index.module.scss';
import { useEffect } from 'react';

export default function SettingsPortSelector() {
  const [devices, setDevices] = useAtom(deviceAtom);
  const [selectedPort, setSelectedPort] = useAtom(selectedPortAtom);

  useEffect(() => {
    (async () => {
      const devicesSnap = await commands.getUsbDevices();
      switch (devicesSnap.status) {
        case 'ok':
          setDevices(devicesSnap.data);
          break;
        case 'error':
          console.error(devicesSnap.error);
          return;
      }
    })();
  }, []);

  return (
    <section className={styles.port_selector}>
      <p>{`選択: ${selectedPort ?? '未選択'}`}</p>

      <ul>
        {devices.map((device) => (
          <li key={device.port_name} onClick={() => setSelectedPort(device.port_name)}>
            {device.product_name}
          </li>
        ))}
      </ul>
    </section>
  );
}
