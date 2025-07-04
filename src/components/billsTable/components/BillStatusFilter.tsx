import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BillStatuses } from '../../../consts/bill';

type BillStatusFilterProps = {
  filterStatus: string;
  onFilterChange: (newStatus: string) => void;
};

export const BillStatusFilter: React.FC<BillStatusFilterProps> = ({
  filterStatus,
  onFilterChange,
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="bill-type-label">Filter by Bill Type</InputLabel>
      <Select
        labelId="bill-type-label"
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {Object.entries(BillStatuses).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
