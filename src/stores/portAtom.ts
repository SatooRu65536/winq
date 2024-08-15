import { atom } from 'jotai';

export const portsAtom = atom<string[]>([]);
export const selectedPortAtom = atom<string | null>(null);
