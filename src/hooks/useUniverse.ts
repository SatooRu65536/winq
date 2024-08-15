import { useMemo, useState } from 'react';

// チャンネルの数
const CHANNEL_COUNT = 512;
// チャンネルの値の範囲
const CHANNNE_VALUE_MIN = 0;
const CHANNNE_VALUE_MAX = 255;

export interface Channel {
  num: number;
  value: number;
}

export default function useUniverse() {
  const [channels, setChannels] = useState<Channel[]>(
    Array.from({ length: CHANNEL_COUNT }, (_, i) => ({ num: i + 1, value: 0 })),
  );

  /**
   * チャンネルの値を設定する
   * @param channel
   * @param value
   */
  const setChannel = useMemo(
    () => (channel: number, value: number) => {
      const clampedValue = Math.min(Math.max(value, CHANNNE_VALUE_MIN), CHANNNE_VALUE_MAX);

      setChannels((prevChannels) => {
        const clonedChannels = structuredClone(prevChannels);
        clonedChannels[channel - 1].value = clampedValue;
        console.log(clonedChannels[0]);
        return clonedChannels;
      });
    },
    [setChannels],
  );

  /**
   * 全てのチャンネルの値を設定する
   * @param value
   */
  const setAllChannels = useMemo(
    () => (value: number) => {
      setChannels((prevChannels) =>
        prevChannels.map((prevChannel) => ({ num: prevChannel.num, value, tmpValue: value.toString() })),
      );
    },
    [setChannels],
  );

  return { channels, setChannel, setAllChannels };
}
