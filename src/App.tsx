import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Typography, Box } from '@mui/material';
import { TableContextProvider } from './context/TableContextProvider';
import { Table } from './components/Table';
import { ErrorFallback } from './components/ErrorFallback';
import { Header } from './components/Header';
import { logError } from './utils/logError';
import { INSTRUCTIONS } from './stringContants';
import { EditToggleButton } from './components/EditToggleButton';

export default function App() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <Header />
        <Box sx={{ flexGrow: '1', padding: 2 }}>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <TableContextProvider>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 2,
                }}
              >
                <Typography sx={{ mt: 2, mb: 2 }}>{INSTRUCTIONS}</Typography>
                <EditToggleButton />
              </Box>
              <Table />
            </TableContextProvider>
          </ErrorBoundary>
        </Box>
      </ErrorBoundary>
    </StrictMode>
  );
}
