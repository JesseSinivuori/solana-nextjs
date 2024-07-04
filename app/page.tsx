import { Suspense } from "react";
import { Account } from "./_components/account";
import { getBalance } from "./_lib/get-balance";
import { transfer } from "./_lib/transfer";
import { Exchange } from "./_components/exchange";

export default async function Home() {
  /*  await transfer({
    senderSecretKey: process.env.SOLANA_SECRET_KEY!,
    receiverPublicKey: process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY_2!,
  }); */

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-wrap gap-8 items-center justify-center ">
        {process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY && (
          <Account publicKey={process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY} />
        )}
        {process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY_2 && (
          <Account publicKey={process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY_2} />
        )}
      </div>
      <div className="items-center justify-center flex">
        <Exchange />
      </div>
    </main>
  );
}
