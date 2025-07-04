import type { Meta, StoryObj } from '@storybook/react';
import { BillModal } from './BillModal';

const sampleBill = {
  id: 'B1232025',
  billNo: 'B123',
  billYear: '2025',
  billType: 'Finance',
  billStatus: 'Passed',
  sponsor: 'John Doe',
  titleEn: 'Finance Bill 2025 - English Title',
  titleGa: 'Bille Airgeadais 2025 - Teideal Gaeilge',
};

const meta: Meta<typeof BillModal> = {
  title: 'Components/BillModal',
  component: BillModal,
};

export default meta;

export const Default: StoryObj<typeof BillModal> = {
  render: (args) => <BillModal {...args} />,
  args: {
    open: true,
    onClose: () => alert('Modal closed'),
    bill: sampleBill,
  },
};
