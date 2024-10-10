import { Box, Typography } from '@mui/material';
import { APP_SUBTITLE, APP_TITLE } from '../stringConstants';

export const Header: React.FC = () => (
  <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', marginBottom: 2 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      {APP_TITLE}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {APP_SUBTITLE}
    </Typography>
  </Box>
);
