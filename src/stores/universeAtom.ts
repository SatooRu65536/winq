import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

// チャンネルの数
const CHANNEL_COUNT = 512;

export interface Channel {
  num: number;
  value: number;
}

export interface Universe {
  id: number;
  name: string;
  channels: Channel[];
}

const universeAtomFamily = atomFamily(
  ({ id }: { id: Universe['id'] }) =>
    atom({
      id,
      name: '',
      channels: Array.from({ length: CHANNEL_COUNT }, (_, i) => ({ num: i + 1, value: 0 })),
    }),
  (a, b) => a.id === b.id,
);

const universeIdListAtom = atom<number[]>([0]);
export const selectedUniverseIdAtom = atom(0);

export const selectedUniverseChannelsAtom = atom(
  (get) => {
    const universeIdList = get(universeIdListAtom);
    const universeList = universeIdList.map((id) => get(universeAtomFamily({ id })));
    const selectedUniverseId = get(selectedUniverseIdAtom);

    const selectedUniverse = universeList.find((universe) => universe.id === selectedUniverseId);
    return selectedUniverse?.channels || [];
  },
  (get, set, fn: (prev: Channel[]) => Channel[]) => {
    const selectedUniverseId = get(selectedUniverseIdAtom);
    const universe = get(universeAtomFamily({ id: selectedUniverseId }));

    const updatedChannels = fn(universe.channels);
    set(universeAtomFamily({ id: selectedUniverseId }), { ...universe, channels: updatedChannels });
  },
);
