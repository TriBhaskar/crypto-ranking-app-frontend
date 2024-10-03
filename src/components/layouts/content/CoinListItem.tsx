import { TableRow, TableCell } from "@/components/ui/table";
import { Coin } from "@/model/Coin";

interface CoinListItemProps {
  coin: Coin;
}

export default function CoinListItem({ coin }: CoinListItemProps) {
  return (
    <TableRow>
      <TableCell>{coin.name}</TableCell>
      <TableCell>{coin.symbol}</TableCell>
      <TableCell>{coin.price}</TableCell>
      <TableCell>{coin.marketCap}</TableCell>
      <TableCell>{coin.rank}</TableCell>
      <TableCell>{coin.change}</TableCell>
    </TableRow>
  );
}
