import { render, screen } from '@testing-library/react';
import TableCellEnriched from './TableCellEnriched';
import { Enriched } from '../../hooks/apiData.types';

describe('TableCellEnriched', () => {
  it('renders "Crown Jewel" when isCrownJewel is true', () => {
    const data: Enriched = { isCrownJewel: true };
    render(<TableCellEnriched data={data} />);

    const cellElement = screen.getByTestId('table-cell-enriched');
    expect(cellElement).toHaveTextContent('The Crown Jewel!');
  });

  it('renders "Not Crown Jewel" when isCrownJewel is false', () => {
    const data: Enriched = { isCrownJewel: false };
    render(<TableCellEnriched data={data} />);

    const cellElement = screen.getByTestId('table-cell-enriched');
    expect(cellElement).toHaveTextContent('Not Crown Jewel');
  });
});
