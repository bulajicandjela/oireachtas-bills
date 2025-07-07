import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TablePagination,
  Box,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useBillsQuery } from '../../queries/useBillsQuery';
import type { Bill } from '../../types/bill';
import { BillModal } from './components/billModal/BillModal';
import { BillStatusFilter } from './components/BillStatusFilter';
import { BillTableBody } from './components/BillTableBody';
import { useFavourites } from './hooks/useFavorites';
import { BillTableHeader } from './components/BillTableHeader';
import { usePagination } from './hooks/usePagination';

const columns = [
  { label: 'Bill Number', key: 'bill_no' },
  { label: 'Bill Type', key: 'bill_type' },
  { label: 'Bill Status', key: 'bill_status' },
  { label: 'Sponsor', key: 'sponsor' },
];

const filterBarSx = {
  borderBottom: 1,
  borderColor: 'divider',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
};

export const BillsTable = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const { favourites, favouriteBills, toggleFavourite } = useFavourites();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, resetPage } =
    usePagination();

  const skip = activeTab === 0 ? page * rowsPerPage : 0;
  const limit = activeTab === 0 ? rowsPerPage : 10000;

  const { data, isLoading, isError } = useBillsQuery(
    skip,
    limit,
    activeTab === 0 ? filterStatus || undefined : undefined,
    { enabled: activeTab === 0 }
  );
  const allBills = data?.bills ?? [];
  const totalBills = data?.total ?? 0;

  const filteredBills =
    activeTab === 0
      ? allBills
      : favouriteBills.filter((bill) => !filterStatus || bill.billStatus === filterStatus);

  const displayedBills =
    activeTab === 0
      ? filteredBills
      : filteredBills.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  console.log('Displayed Bills:', displayedBills);
  console.log();

  const paginationCount = activeTab === 0 ? totalBills : filteredBills.length;

  const noFavouriteBills = activeTab === 1 && displayedBills.length === 0;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    resetPage();
    setFilterStatus('');
  };

  const handleRowClick = useCallback((bill: Bill) => {
    setSelectedBill(bill);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedBill(null);
  }, []);

  useEffect(() => {
    resetPage;
  }, [filterStatus]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: 4 }}>
        <Alert severity="error">Failed to load bills. Please try again later.</Alert>
      </Box>
    );
  }

  return (
    <>
      <Box sx={filterBarSx}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Bills" />
          <Tab label="Favourited Bills" />
        </Tabs>
        <BillStatusFilter filterStatus={filterStatus} onFilterChange={setFilterStatus} />
      </Box>

      {noFavouriteBills ? (
        <Box sx={{ padding: 2 }}>
          <Alert severity="info">You have no favourited bills for that category yet.</Alert>
        </Box>
      ) : (
        <>
          <Table>
            <TableHead>
              <BillTableHeader columns={columns} />
            </TableHead>

            <BillTableBody
              bills={displayedBills}
              favourites={favourites}
              toggleFavourite={toggleFavourite}
              onRowClick={handleRowClick}
            />
          </Table>

          <TablePagination
            component="div"
            count={paginationCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}
          />
        </>
      )}

      <BillModal open={!!selectedBill} onClose={handleModalClose} bill={selectedBill} />
    </>
  );
};
