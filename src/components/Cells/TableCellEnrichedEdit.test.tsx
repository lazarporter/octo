import { render, fireEvent, screen } from '@testing-library/react';
import { TableCellEnrichedEdit } from './TableCellEnrichedEdit';
import { initialTableContext, TableContext } from '../../context/TableContext';
import { TEST_IDS } from '../../stringConstants';

describe('TableCellEnrichedEdit', () => {
  const mockHandleStageEdit = jest.fn();
  const mockData = { isCrownJewel: true };
  const mockId = '1';

  const renderWithContextProvider = () => {
    return render(
      <TableContext.Provider
        value={{
          ...initialTableContext,
          handleStageEdit: mockHandleStageEdit,
        }}
      >
        <table>
          <tbody>
            <tr>
              <TableCellEnrichedEdit data={mockData} id={mockId} />
            </tr>
          </tbody>
        </table>
      </TableContext.Provider>
    );
  };

  it('renders correctly and handles value change', () => {
    renderWithContextProvider();

    expect(
      screen.getByTestId(TEST_IDS.TABLE_CELL_ENRICHED_EDIT)
    ).toBeInTheDocument();

    // test the selection behavior
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('True');

    fireEvent.mouseDown(select);
    const falseOption = screen.getByText('False');
    fireEvent.click(falseOption);

    expect(mockHandleStageEdit).toHaveBeenCalledWith(mockId, false);
    expect(select).toHaveTextContent('False');
  });
});
