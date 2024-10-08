import { render, screen } from '@testing-library/react';
import TableCellEnriched, { areEqual } from './TableCellEnriched';
import { Enriched } from '../../hooks/apiData.types';

describe('TableCellEnriched', () => {
  it('renders a jewel icon when isCrownJewel is true', () => {
    const data: Enriched = { isCrownJewel: true };
    render(<TableCellEnriched data={data} />);

    const cell = screen.getByTestId('table-cell-enriched');
    const iconElement = screen.getByTestId('crown-jewel');

    expect(cell).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('does not render a jewel icon when isCrownJewel is false', () => {
    const data: Enriched = { isCrownJewel: false };
    render(<TableCellEnriched data={data} />);

    const cell = screen.getByTestId('table-cell-enriched');
    const iconElement = screen.queryByTestId('crown-jewel');

    expect(cell).toBeInTheDocument();
    expect(iconElement).not.toBeInTheDocument();
  });

  describe('props areEqual comparison', () => {
    it('returns true when isCrownJewel is the same', () => {
      const prevProps = { data: { isCrownJewel: true } };
      const nextProps = { data: { isCrownJewel: true } };
      expect(areEqual(prevProps, nextProps)).toBe(true);
    });

    it('returns false when isCrownJewel is different', () => {
      const prevProps = { data: { isCrownJewel: true } };
      const nextProps = { data: { isCrownJewel: false } };
      expect(areEqual(prevProps, nextProps)).toBe(false);
    });
  });
});
