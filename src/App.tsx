import Box from '@mui/material/Box';
import { Table } from './components/Table';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { StrictMode } from 'react';
import { reportError } from './utils/reportError';
import { Typography } from '@mui/material';

export default function App() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={reportError}>
        <Box sx={{ flexGrow: '1', padding: 2 }}>
          <Table />
          <Typography sx={{ mt: 2 }}>
            Refresh a few times to eventually encounter an error.
          </Typography>
        </Box>
      </ErrorBoundary>
    </StrictMode>
  );
}
