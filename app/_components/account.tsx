import { getBalance } from "../_lib/get-balance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Account = async ({ publicKey }: { publicKey: string }) => {
  const balance = await getBalance(publicKey);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{publicKey}</CardTitle>
        {/*   <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>SOL: {balance?.balanceInSOL}</p>
        <p>Lamports: {balance?.balanceInLamports}</p>
      </CardContent>
      {/*   <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};
