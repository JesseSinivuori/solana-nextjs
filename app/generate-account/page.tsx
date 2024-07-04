"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addKeypairToEnvFile } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";
import { useState } from "react";

export default function Page() {
  const [account, setAccount] = useState<Keypair>();

  const handleGenerateAccount = async () => {
    const keypair = Keypair.generate();
    setAccount(keypair);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Generate Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            type="submit"
            variant="outline"
            onClick={handleGenerateAccount}
          >
            Generate Account
          </Button>
        </CardContent>
      </Card>
      {account && (
        <div className="flex flex-col w-[600px] overflow-auto py-8">
          <p>Public Key: {account.publicKey.toBase58()}</p>
          <p>Secret Key: {account.secretKey.toString()}</p>
        </div>
      )}
    </div>
  );
}
