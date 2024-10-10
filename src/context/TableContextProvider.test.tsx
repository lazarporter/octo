import { render, act, screen } from '@testing-library/react';
import { TableContextProvider } from './TableContextProvider';
import { useTableContext } from './TableContext';

import { staticData as mockApiData } from '../assets/staticData';
import { fetchData } from '../api/fetchData';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../components/ErrorFallback';
import { TEST_IDS } from '../stringConstants';

jest.mock('../api/fetchData');
const mockErrorHandler = jest.fn();

// Mock component to test the context
const TestComponent = () => {
  const { data, editMode, loading } = useTableContext();
  return (
    <div>
      <div data-testid="data-length">{data.length}</div>
      <div data-testid="edit-mode">{editMode.toString()}</div>
      <div data-testid="loading">{loading.toString()}</div>
    </div>
  );
};

const renderWithContextProvider = () => {
  return render(
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={mockErrorHandler}>
      <TableContextProvider>
        <TestComponent />
      </TableContextProvider>
    </ErrorBoundary>
  );
};

describe('TableContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data and update context on mount', async () => {
    (fetchData as jest.Mock).mockResolvedValue(mockApiData);

    await act(async () => {
      renderWithContextProvider();
    });

    expect(screen.getByTestId('data-length').textContent).toBe(
      mockApiData.length.toString()
    );
    expect(screen.getByTestId('edit-mode').textContent).toBe('false');
    expect(screen.getByTestId('loading').textContent).toBe('false');
  });

  it('should set loading state while fetching data', async () => {
    (fetchData as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockApiData), 100))
    );

    await act(async () => {
      renderWithContextProvider();

      // Wait for the next tick to allow state updates
      await Promise.resolve();
    });

    expect(screen.getByTestId('loading').textContent).toBe('true');

    // Wait 150 to make sure the mocked fetchData resolved
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(screen.getByTestId('loading').textContent).toBe('false');
  });

  it('should handle error when fetching data fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (fetchData as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    await act(async () => {
      renderWithContextProvider();
    });

    expect(screen.getByTestId(TEST_IDS.ERROR_FALLBACK)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
