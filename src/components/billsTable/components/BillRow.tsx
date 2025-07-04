import React, { useCallback, useState } from 'react';
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import type { Bill } from '../../../types/bill';

type BillRowProps = {
  bill: Bill;
};

const BillRow: React.FC<BillRowProps> = ({ bill }) => {
  const [isFav, setIsFav] = useState(false);
  const cellValues = [bill.billNo, bill.billType, bill.billStatus, bill.sponsor];

  const handleToggleFav = useCallback(() => {
    setIsFav((prev) => {
      console.log(`${prev ? 'Unfavourited' : 'Favourited'} bill ${bill.billNo}`);
      return !prev;
    });
  }, [bill.billNo]);

  return (
    <TableRow hover>
      {cellValues.map((value, index) => (
        <TableCell key={index}>{value}</TableCell>
      ))}
      <TableCell align="center">
        <Tooltip title={isFav ? 'Unfavourite' : 'Favourite'}>
          <IconButton onClick={handleToggleFav}>
            {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default BillRow;
