import { TableRow, TableCell } from '@mui/material';

type Column = { label: string; key: string };

export const BillTableHeader = ({ columns }: { columns: Column[] }) => (
  <TableRow>
    {columns.map((col) => (
      <TableCell key={col.key}>{col.label}</TableCell>
    ))}
    <TableCell>Favourite</TableCell>
  </TableRow>
);
