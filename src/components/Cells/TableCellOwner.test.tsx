import { render, screen } from '@testing-library/react';
import TableCellOwner from './TableCellOwner';
import { Owner } from '../../hooks/apiData.types';
import * as utils from '../../utils/utils';

jest.mock('../../utils/utils', () => ({
  getOwnerName: jest.fn(),
}));

describe('TableCellOwner', () => {
  const mockOwner: Owner = {
    name: 'John Doe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the owner name correctly', () => {
    (utils.getOwnerName as jest.Mock).mockReturnValue('Lazer');

    render(<TableCellOwner data={mockOwner} />);

    const cellElement = screen.getByTestId('table-cell-owner');
    expect(cellElement).toHaveTextContent('Lazer');
  });

  it('calls getOwnerName with the correct data', () => {
    render(<TableCellOwner data={mockOwner} />);

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
