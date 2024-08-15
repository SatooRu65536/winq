import { DeviceInfo } from '@/types/bindings';
import { atom } from 'jotai';

export const deviceAtom = atom<DeviceInfo[]>([]);
export const selectedPortAtom = atom<string | null>(null);
