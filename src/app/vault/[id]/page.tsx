import "server-only";
import { VaultDetail } from "../../../components/VaultDetail";
import { getVaultById } from "../../../lib/vaultData";
import { notFound } from "next/navigation";
import { z } from "zod";

const VaultParamsSchema = z.object({
  id: z.string().min(1, "Vault ID is required").max(50, "Vault ID is too long"),
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
  const vault = getVaultById(id);

  if (!vault) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-950">
      <main className="min-h-[calc(100vh-5rem)] py-8">
        <VaultDetail vaultId={id} />
      </main>
    </div>
  );
}
