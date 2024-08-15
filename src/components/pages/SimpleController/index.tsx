import styles from './index.module.scss';
import useUniverse from '@/hooks/useUniverse';
import Slider from './Slider';

export default function SimpleController() {
  const { channels, setChannel } = useUniverse();

  return (
    <section className={styles.simple_controller}>
      {channels.map((channel) => (
        <Slider
          key={channel.num}
          num={channel.num}
          setChannel={setChannel}
          value={channel.value}
        />
      ))}
    </section>
  );
}
