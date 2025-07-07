import { TableRow, TableCell } from '@mui/material';

type Column = { label: string; key: string };

const headerCellSx = { fontSize: 15, color: 'text.secondary' };

export const BillTableHeader = ({ columns }: { columns: Column[] }) => (
  <TableRow>
    {columns.map((col) => (
      <TableCell key={col.key} sx={headerCellSx}>
        {col.label}
      </TableCell>
    ))}
    <TableCell sx={headerCellSx}>Favourite</TableCell>
  </TableRow>
);
