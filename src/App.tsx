import Box from '@mui/material/Box';
import { Table } from './components/Table';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { StrictMode } from 'react';
import { logError } from './utils/logError';
import { Typography } from '@mui/material';
import { Header } from './components/Header';
import { INSTRUCTIONS } from './stringContants';

export default function App() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <Header />
        <Box sx={{ flexGrow: '1', padding: 2 }}>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Typography sx={{ mt: 2, mb: 2 }}>{INSTRUCTIONS}</Typography>
            <Table />
          </ErrorBoundary>
        </Box>
      </ErrorBoundary>
    </StrictMode>
  );
}
