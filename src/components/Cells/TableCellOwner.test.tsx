import { screen } from '@testing-library/react';
import TableCellOwner from './TableCellOwner';
import { Owner } from '../../types/apiData.types';
import { renderWithTable } from './CustomTableCell.test';
import * as utils from '../../utils/utils';
import { TABLE_CELL_NO_DATA, TEST_IDS } from '../../stringConstants';

jest.mock('../../utils/utils', () => ({
  getOwnerName: jest.fn(),
}));

describe('TableCellOwner', () => {
  const mockOwner: Owner = {
    name: 'This isnt ever used',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the owner name correctly', () => {
    (utils.getOwnerName as jest.Mock).mockReturnValue('Lazer');

    renderWithTable(<TableCellOwner data={mockOwner} />);

    const cellElement = screen.getByTestId(TEST_IDS.TABLE_CELL_OWNER);
    expect(cellElement).toHaveTextContent('Lazer');
  });

  it('renders fallback for missing owner name', () => {
    (utils.getOwnerName as jest.Mock).mockReturnValue(null);

    renderWithTable(<TableCellOwner data={mockOwner} />);

    const cellElement = screen.getByTestId(TEST_IDS.TABLE_CELL_OWNER);
    expect(cellElement).toHaveTextContent(TABLE_CELL_NO_DATA);
  });

  it('calls getOwnerName with the correct data', () => {
    renderWithTable(<TableCellOwner data={mockOwner} />);

    expect(utils.getOwnerName).toHaveBeenCalledWith(mockOwner);
  });

  describe('props areEqual comparison', () => {
    it('returns true when owner names are the same', () => {
      const props = { data: { name: 'Lazer Porter' } };
      const prevProps = { ...props };
      const nextProps = { ...props };
      (utils.getOwnerName as jest.Mock).mockReturnValue('Lazer Porter');

      const areEqual = (TableCellOwner as any).compare;

      expect(areEqual(prevProps, nextProps)).toBe(true);
    });

    it('returns false when owner names are different', () => {
      const prevProps = { data: { name: 'Lazer' } };
      const nextProps = { data: { name: 'Roy' } };
      (utils.getOwnerName as jest.Mock)
        .mockReturnValueOnce('Lazer')
        .mockReturnValueOnce('Roy');

      const areEqual = (TableCellOwner as any).compare;

      expect(areEqual(prevProps, nextProps)).toBe(false);
    });
  });
});
