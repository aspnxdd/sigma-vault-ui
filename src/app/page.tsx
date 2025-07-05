import "server-only";
import { VaultTable } from '../components/VaultTable';
import { getAllVaults } from '../lib/vaultData';

export default async function HomePage() {
  // This runs on the server side
  const vaults = getAllVaults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-950">
      <main className="min-h-[calc(100vh-5rem)] py-8">
        <VaultTable />
      </main>
    </div>
  );
}
