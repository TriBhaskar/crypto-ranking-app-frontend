import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Coin } from "@/model/Coin";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Content() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/coins");
        console.log("Coins:", response.data);
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Table className="">
        <TableCaption>A list of your coins</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>MarketCap</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.symbol}>
              <TableCell>{coin.name}</TableCell>
              <TableCell className={`bg-[${coin.color}]`}>
                {coin.symbol}
              </TableCell>
              <TableCell>{coin.price}</TableCell>
              <TableCell>{coin.marketCap}</TableCell>
              <TableCell>
                <img src={coin.iconUrl} height="30" width="30"></img>
              </TableCell>
              <TableCell>{coin.change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
