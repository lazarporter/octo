import { Box, Button, Paper, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <Box component={Paper} data-testid="error-fallback">
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
      {error?.message ?? 'Something went wrong.'}
    </Typography>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </Box>
);
