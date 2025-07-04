import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import type { Bill } from '../../../../types/bill';
import { BillModal } from './BillModal';

const sampleBill: Bill = {
  id: 'B1232025',
  billNo: 'B123',
  billYear: '2025',
  billType: 'Finance',
  billStatus: 'Passed',
  sponsor: 'John Doe',
  titleEn: 'Finance Bill 2025 - English Title',
  titleGa: 'Bille Airgeadais 2025 - Teideal Gaeilge',
};

describe('BillModal', () => {
  it('renders and calls onClose when close button clicked', () => {
    const onCloseMock = vi.fn();

    render(<BillModal open={true} onClose={onCloseMock} bill={sampleBill} />);

    // Check modal shows the English title
    expect(screen.getByText(/Finance Bill 2025 - English Title/i)).toBeInTheDocument();

    // Find close button by accessible name or role — adjust this if your modal uses different markup
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
