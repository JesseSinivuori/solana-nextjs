"use server";
import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";
import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { getSecretUint8Array } from "./get-secret-uint8array";
import { revalidatePath } from "next/cache";

export const transfer = async ({
  senderSecretKey = process.env.SOLANA_SECRET_KEY!,
  receiverPublicKey,
  lamportsToSend,
}: {
  senderSecretKey?: string;
  receiverPublicKey: string;
  lamportsToSend: number;
}) => {
  try {
    const senderSecretKeyUint8Array = getSecretUint8Array(senderSecretKey);

    const senderKeypair = Keypair.fromSecretKey(senderSecretKeyUint8Array);

    const toPubkey = new PublicKey(receiverPublicKey);

    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    const transaction = new Transaction();

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey,
      toPubkey,
      lamports: lamportsToSend,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKeypair,
    ]);

    console.log("signature", signature);

    revalidatePath("/");

    return signature;
  } catch (e: any) {
    console.error(e?.message);
  }
};
