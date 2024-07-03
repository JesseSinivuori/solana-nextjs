import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

export const getBalance = async (SOLANA_PUBLIC_KEY: string) => {
  try {
    const publicKey = new PublicKey(SOLANA_PUBLIC_KEY);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    return { balanceInSOL, balanceInLamports };
  } catch (e: any) {
    console.error(e?.message);
  }
};
