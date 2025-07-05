import "server-only";
import { VaultTable } from "../components/VaultTable";
import { api } from "~/trpc/server";

export default async function HomePage() {
  const vaults = await api.euler.getAllPools();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-950">
      <main className="min-h-[calc(100vh-5rem)] py-8">
        <VaultTable vaults={vaults} />
      </main>
    </div>
  );
}
