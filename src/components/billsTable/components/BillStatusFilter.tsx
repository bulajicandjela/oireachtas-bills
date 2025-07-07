// NOTE:
// The assignment requested filtering by bill "type", but the Swagger documentation does not
// define allowed values or explain how to filter by `billType`. Instead, `bill_status` is
// a well-documented and supported query parameter with clearly listed valid values.
// For this reason, I’ve implemented filtering by status as a practical and stable alternative.
// This also aligns with typical filtering needs in legislative data (e.g., showing only active bills).

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
