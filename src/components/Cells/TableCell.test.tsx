import { render, screen } from '@testing-library/react';
import TableCell from './TableCell';
import { Enriched, Owner } from '../../hooks/apiData.types';

describe('TableCell', () => {
  it('renders TableCellEnriched for Enriched data', () => {
    const enrichedData: Enriched = { isCrownJewel: true };
    render(<TableCell data={enrichedData} />);
    expect(screen.getByTestId('table-cell-enriched')).toBeInTheDocument();
  });

  it('renders TableCellOwner for Owner data', () => {
    const ownerData: Owner = { name: 'John Doe' };
    render(<TableCell data={ownerData} />);
    expect(screen.getByTestId('table-cell-owner')).toBeInTheDocument();
  });

  it('renders a simple td for string data', () => {
    const stringData = 'Hello, World!';
    render(<TableCell data={stringData} />);
    const cell = screen.getByTestId('table-cell-string');
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveTextContent('Hello, World!');
  });
});
