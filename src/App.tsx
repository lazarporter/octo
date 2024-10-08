import { Table } from './components/Table';
import { useApiData } from './hooks/useApiData';

export default function App() {
  const tableProps = useApiData();

  return <Table {...tableProps} />;
}
