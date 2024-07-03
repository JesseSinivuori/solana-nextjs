"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { transfer } from "../_lib/transfer";
import { useState } from "react";
import Link from "next/link";

export const Exchange = () => {
  const [signature, setSignature] = useState<string | undefined>();

  const handleExchange = async (formData: FormData) => {
    const lamportsToSend = Number(formData.get("lamportsToSend"));

    if (lamportsToSend && lamportsToSend > 0) {
      const sig = await transfer({
        lamportsToSend,
        receiverPublicKey: process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY_2!,
      });

      setSignature(sig);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Exchange</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleExchange}>
            <div className="flex flex-col gap-4">
              <div>
                <label>From</label>
                <Input
                  name="from"
                  disabled
                  value={process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY!}
                />
              </div>
              <div>
                <label>To</label>
                <Input
                  name="to"
                  disabled
                  value={process.env.NEXT_PUBLIC_SOLANA_PUBLIC_KEY_2!}
                />
              </div>
              <div>
                <label>{`Amount (in Lamports)`} </label>
                <Input name="lamportsToSend" />
              </div>
              <Button type="submit" variant="outline">
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {signature && (
        <div className="flex justify-center">
          <Button asChild>
            <Link
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              className="w-full"
            >
              Solana Explorer
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
