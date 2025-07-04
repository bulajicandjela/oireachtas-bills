import React, { useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Bill } from '../../../../types/bill';

type BillModalProps = {
  open: boolean;
  onClose: () => void;
  bill: Bill | null;
};

const closeButtonSx = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: (theme: any) => theme.palette.grey[500],
};

export const BillModal: React.FC<BillModalProps> = ({ open, onClose, bill }) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const hasNoBill = !bill;

  useEffect(() => {
    if (open) setTabIndex(0);
  }, [open]);

  const handleOnChange: (event: React.SyntheticEvent, value: any) => void = (_, newValue) =>
    setTabIndex(newValue);

  const renderTitle = useMemo(() => {
    if (tabIndex === 0) {
      return <Typography variant="body1">{bill?.titleEn || 'No English title'}</Typography>;
    }
    return <Typography variant="body1">{bill?.titleGa || 'No Irish title'}</Typography>;
  }, [bill, tabIndex]);

  if (hasNoBill) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Bill Titles
        <IconButton aria-label="close" onClick={onClose} sx={closeButtonSx}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleOnChange}>
          <Tab label="English" />
          <Tab label="Gaeilge" />
        </Tabs>
        <Box mt={2}>{renderTitle}</Box>
      </DialogContent>
    </Dialog>
  );
};
