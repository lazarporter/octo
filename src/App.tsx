import Box from '@mui/material/Box/Box';
import { Table } from './components/Table';
import { useApiData } from './hooks/useApiData';

export default function App() {
  const tableProps = useApiData();

  return (
    <Box sx={{ flexGrow: '1', padding: 2 }}>
      <Table {...tableProps} />
    </Box>
  );
}
