import * as SliderRadix from '@radix-ui/react-slider';
import styles from './index.module.scss';
import { ChangeEvent, memo } from 'react';
import { Channel } from '@/hooks/useUniverse';

interface Props {
  num: Channel['num'];
  value: Channel['value'];
  setChannel: (channel: number, value: number) => void;
}

export default memo(function Slider(props: Props) {
  const { num, value, setChannel } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tmpValue = parseInt(e.target.value);
    setChannel(num, tmpValue);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const tmpValue = Number(e.target.value);
    setChannel(num, tmpValue);
  };

  return (
    <div className={styles.slider}>
      <input
        className={styles.input}
        type="number"
        value={Number.isNaN(value) ? '' : value}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <SliderRadix.Root
        className={styles.slider}
        dir="rtl"
        max={255}
        orientation="vertical"
        step={1}
        value={[value]}
        onValueChange={(value) => setChannel(num, value[0])}
      >
        <SliderRadix.Track className={styles.track}>
          <SliderRadix.Range className={styles.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label="Volume" className={styles.thumb} />
      </SliderRadix.Root>

      <p>{num}</p>
    </div>
  );
});
