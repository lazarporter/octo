import { screen } from '@testing-library/react';
import TableCellEnriched from './TableCellEnriched';
import { Enriched } from '../../hooks/apiData.types';
import { renderWithTable } from './CustomTableCell.test';
import { TEST_IDS } from '../../stringContants';

describe('TableCellEnriched', () => {
  it('renders a jewel icon when isCrownJewel is true', () => {
    const data: Enriched = { isCrownJewel: true };
    renderWithTable(<TableCellEnriched data={data} />);

    const cell = screen.getByTestId(TEST_IDS.TABLE_CELL_ENRICHED);
    const iconElement = screen.getByTestId(TEST_IDS.CROWN_JEWEL);

    expect(cell).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('does not render a jewel icon when isCrownJewel is false', () => {
    const data: Enriched = { isCrownJewel: false };
    renderWithTable(<TableCellEnriched data={data} />);

    const cell = screen.getByTestId(TEST_IDS.TABLE_CELL_ENRICHED);
    const iconElement = screen.queryByTestId(TEST_IDS.CROWN_JEWEL);

    expect(cell).toBeInTheDocument();
    expect(iconElement).not.toBeInTheDocument();
  });

  describe('props areEqual comparison', () => {
    it('returns true when isCrownJewel is the same', () => {
      const prevProps = { data: { isCrownJewel: true } };
      const nextProps = { data: { isCrownJewel: true } };

      const areEqual = (TableCellEnriched as any).compare;
      expect(areEqual(prevProps, nextProps)).toBe(true);
    });

    it('returns false when isCrownJewel is different', () => {
      const prevProps = { data: { isCrownJewel: true } };
      const nextProps = { data: { isCrownJewel: false } };

      const areEqual = (TableCellEnriched as any).compare;
      expect(areEqual(prevProps, nextProps)).toBe(false);
    });
  });
});
