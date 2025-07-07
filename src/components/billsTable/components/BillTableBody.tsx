import React from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import type { Bill } from '../../../types/bill';

type BillTableBodyProps = {
  bills: Bill[];
  favourites: Set<string>;
  toggleFavourite: (bill: Bill) => void;
  onRowClick: (bill: Bill) => void;
};

const rowStyles = {
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'action.selected',
  },
} as const;

export const BillTableBody: React.FC<BillTableBodyProps> = ({
  bills,
  favourites,
  toggleFavourite,
  onRowClick,
}) => (
  <TableBody>
    {bills.map((bill, index) => {
      // Note: Another option would be to use table configuration object for fields to improve scalability with more columns
      const fields = [bill.billNo, bill.billType, bill.billStatus, bill.sponsor];

      return (
        <TableRow key={`${bill.id}-${index}`} hover sx={rowStyles} onClick={() => onRowClick(bill)}>
          {fields.map((field, index) => (
            <TableCell key={index}>{field}</TableCell>
          ))}
          <TableCell>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(bill);
              }}
            >
              {favourites.has(bill.id) ? <Star color="primary" /> : <StarBorder />}
            </IconButton>
          </TableCell>
        </TableRow>
      );
    })}
  </TableBody>
);
