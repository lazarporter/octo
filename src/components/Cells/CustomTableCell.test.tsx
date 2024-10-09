import { render, screen } from '@testing-library/react';
import CustomTableCell from './CustomTableCell';
import { Enriched, Owner } from '../../types/apiData.types';
import { TEST_IDS } from '../../stringContants';

export const renderWithTable = (component: React.ReactNode) => {
  return render(
    <table>
      <tbody>
        <tr>{component}</tr>
      </tbody>
    </table>
  );
};

describe('TableCell', () => {
  it('renders TableCellEnriched for Enriched data', () => {
    const enrichedData: Enriched = { isCrownJewel: true };
    renderWithTable(<CustomTableCell data={enrichedData} />);
    expect(
      screen.getByTestId(TEST_IDS.TABLE_CELL_ENRICHED)
    ).toBeInTheDocument();
  });

  it('renders TableCellOwner for Owner data', () => {
    const ownerData: Owner = { name: 'Lazer Porter' };
    renderWithTable(<CustomTableCell data={ownerData} />);
    expect(screen.getByTestId(TEST_IDS.TABLE_CELL_OWNER)).toBeInTheDocument();
  });

  it('renders a simple td for string data', () => {
    const stringData = 'Hello, World!';
    renderWithTable(<CustomTableCell data={stringData} />);
    const cell = screen.getByTestId(TEST_IDS.TABLE_CELL_STRING);
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveTextContent(stringData);
  });
});
