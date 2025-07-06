import "server-only";
import { VaultDetail } from "../../../components/VaultDetail";
import { notFound } from "next/navigation";
import { z } from "zod";
import { api } from "~/trpc/server";

const VaultParamsSchema = z.object({
  id: z.string(),
});

type Props = {
  params: Promise<z.infer<typeof VaultParamsSchema>>;
};

export default async function VaultPage({ params: promiseParams }: Props) {
  const params = await promiseParams;
  const validationResult = VaultParamsSchema.safeParse(params);

  if (!validationResult.success) {
    console.error("Invalid vault parameters:", validationResult.error.issues);
    notFound();
  }

  const { id } = validationResult.data;
  const vault = await api.euler.getPoolById({ id });
  const depositedAssets = await api.euler.getPoolDepositedAssets({
    token0Id: vault.token0.id,
    token1Id: vault.token1.id,
  });

  if (!vault) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-950">
      <main className="min-h-[calc(100vh-5rem)] py-8">
        <VaultDetail vault={vault} depositedAssets={depositedAssets} />
      </main>
    </div>
  );
}
