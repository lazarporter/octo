import { render, screen } from '@testing-library/react';
import { TableContainer } from './TableContainer';
import { TableContextProvider } from '../context/TableContextProvider';
import { ErrorBoundary } from 'react-error-boundary';
import {
  TEST_IDS,
  TABLE_NO_DATA_MESSAGE,
  INSTRUCTIONS,
} from '../stringConstants';
import { staticData } from '../assets/staticData';

jest.mock('../context/TableContext', () => ({
  ...jest.requireActual('../context/TableContext'),
  useTableContext: jest.fn(),
}));

const mockErrorHandler = jest.fn();

describe('TableContainer', () => {
  const mockUseTableContext = jest.requireMock(
    '../context/TableContext'
  ).useTableContext;

  beforeEach(() => {
    mockUseTableContext.mockReset();
  });

  const renderWithErrorBoundary = (component: React.ReactNode) => {
    return render(
      <ErrorBoundary
        FallbackComponent={() => <div>I'm never rendered</div>}
        onError={mockErrorHandler}
      >
        <TableContextProvider>{component}</TableContextProvider>
      </ErrorBoundary>
    );
  };

  it('renders loading spinner when loading is true', () => {
    mockUseTableContext.mockReturnValue({ loading: true, data: [] });

    renderWithErrorBoundary(<TableContainer />);

    expect(
      screen.getByTestId(TEST_IDS.TABLE_LOADING_SPINNER)
    ).toBeInTheDocument();
  });

  it('renders no data message when data is an empty array', () => {
    mockUseTableContext.mockReturnValue({ loading: false, data: [] });

    renderWithErrorBoundary(<TableContainer />);

    expect(screen.getByTestId(TEST_IDS.TABLE_NO_DATA)).toBeInTheDocument();
    expect(screen.getByText(TABLE_NO_DATA_MESSAGE)).toBeInTheDocument();
  });

  it('renders table when data is not empty', () => {
    mockUseTableContext.mockReturnValue({ loading: false, data: staticData });

    renderWithErrorBoundary(<TableContainer />);

    expect(screen.getByText(INSTRUCTIONS)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.TABLE_DATA)).toBeInTheDocument();
    expect(screen.getByText(staticData[0].assetName)).toBeInTheDocument();
  });
});
