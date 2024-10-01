import { TableRow, TableCell } from "@/components/ui/table";
import { Coin } from "@/model/Coin";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CoinListItem() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/v1/coins/ETH/24h"
        );
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
      {coins.map((coin) => (
        <TableRow key={coin.symbol}>
          <TableCell>{coin.name}</TableCell>
          <TableCell>{coin.symbol}</TableCell>
          <TableCell>{coin.price}</TableCell>
          <TableCell>{coin.marketCap}</TableCell>
          <TableCell>{coin.volume}</TableCell>
          <TableCell>{coin.change}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
