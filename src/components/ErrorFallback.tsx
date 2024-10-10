import { Box, Button, Paper, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FallbackProps } from 'react-error-boundary';
import { ERROR_GENERIC, TEST_IDS } from '../stringConstants';

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <Box component={Paper} data-testid={TEST_IDS.ERROR_FALLBACK}>
    <Typography
      variant="h6"
      color="error"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ mr: 1 }} />
      {error?.message ?? ERROR_GENERIC}
    </Typography>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </Box>
);
