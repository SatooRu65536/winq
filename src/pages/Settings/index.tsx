import { portsAtom } from '@/stores/portAtom';
import { useAtom } from 'jotai';

import { commands } from '@/types/bindings';

export default function SettingsPage() {
  const [ports, setPorts] = useAtom(portsAtom);

  const handleFindPort = async () => {
    const portsSnap = await commands.findPort();
    setPorts(portsSnap);
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={handleFindPort}>ポートを探す</button>

      <ul>
        {ports.map((port) => (
          <li key={port}>{port}</li>
        ))}
      </ul>
    </div>
  );
}
