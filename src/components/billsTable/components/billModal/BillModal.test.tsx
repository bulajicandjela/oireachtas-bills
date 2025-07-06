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

    // Click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render anything when bill is null', () => {
    const onCloseMock = vi.fn();
    const { container } = render(<BillModal open={true} onClose={onCloseMock} bill={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('switches to Gaeilge tab and shows Irish title', () => {
    const onCloseMock = vi.fn();
    render(<BillModal open={true} onClose={onCloseMock} bill={sampleBill} />);

    // Click Gaeilge tab
    const gaeilgeTab = screen.getByRole('tab', { name: /gaeilge/i });
    fireEvent.click(gaeilgeTab);

    expect(screen.getByText(/Bille Airgeadais 2025 - Teideal Gaeilge/i)).toBeInTheDocument();
  });

  it('resets to English tab when reopened', () => {
    const onCloseMock = vi.fn();
    const { rerender } = render(<BillModal open={true} onClose={onCloseMock} bill={sampleBill} />);

    // Switch to Gaeilge
    fireEvent.click(screen.getByRole('tab', { name: /gaeilge/i }));
    expect(screen.getByText(/Teideal Gaeilge/i)).toBeInTheDocument();

    // Close and reopen
    rerender(<BillModal open={false} onClose={onCloseMock} bill={sampleBill} />);
    rerender(<BillModal open={true} onClose={onCloseMock} bill={sampleBill} />);

    // Should show English title again
    expect(screen.getByText(/English Title/i)).toBeInTheDocument();
  });

  it('displays fallback text if English or Irish title is missing', () => {
    const billWithMissingTitles = {
      ...sampleBill,
      titleEn: '',
      titleGa: '',
    };

    render(<BillModal open={true} onClose={vi.fn()} bill={billWithMissingTitles} />);

    // English tab (default)
    expect(screen.getByText(/No English title/i)).toBeInTheDocument();

    // Switch to Gaeilge tab
    fireEvent.click(screen.getByRole('tab', { name: /gaeilge/i }));
    expect(screen.getByText(/No Irish title/i)).toBeInTheDocument();
  });
});
