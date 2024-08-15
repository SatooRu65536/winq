import styles from './index.module.scss';
import useUniverse from '@/hooks/useUniverse';
import Slider from './Slider';
import { useEffect } from 'react';
import { commands } from '@/types/bindings';
import { useAtomValue } from 'jotai';
import { selectedPortAtom } from '@/stores/deviceAtom';

export default function SimpleController() {
  const { channels, setChannel } = useUniverse();
  const port = useAtomValue(selectedPortAtom);

  useEffect(() => {
    if (port === null) {
      console.warn('ポートが選択されていません!!');
      return;
    }

    (async () => {
      await commands.dmxStart(
        port,
        channels.map((channel) => channel.value),
      );
    })();

    return () => {
      (async () => {
        await commands.dmxStop(port);
      })();
    };
  }, [port, channels]);

  return (
    <section className={styles.simple_controller}>
      {channels.map((channel) => (
        <Slider key={channel.num} num={channel.num} setChannel={setChannel} value={channel.value} />
      ))}
    </section>
  );
}
