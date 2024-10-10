import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box } from '@mui/material';
import { TableContextProvider } from './context/TableContextProvider';
import { ErrorFallback } from './components/ErrorFallback';
import { Header } from './components/Header';
import { TableContainer } from './containers/TableContainer';
import { logError } from './utils/logError';

export default function App() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <Header />
        <Box sx={{ flexGrow: '1', padding: 2 }}>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <TableContextProvider>
              <TableContainer />
            </TableContextProvider>
          </ErrorBoundary>
        </Box>
      </ErrorBoundary>
    </StrictMode>
  );
}
