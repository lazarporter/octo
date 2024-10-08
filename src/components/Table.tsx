import { APIData } from '../hooks/apiData.types';
import { ApiRequest } from '../hooks/useApiData';
import TableCell from './Cells/TableCell';

export const Table: React.FC<ApiRequest> = ({ loading, data, error }) => {
  if (loading) {
    // Todo make this a pretty component
    return <div>loading...</div>;
  }

  if (error) {
    // Todo make this a pretty component
    return <div>{error}</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    // Todo make this a pretty component
    return <div>No data available</div>;
  }

  const keys = Object.keys(data[0]) as (keyof APIData)[];

  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData) => (
          <tr key={rowData._id}>
            {keys.map((cellName) => (
              <TableCell
                key={`${rowData._id}-${cellName}`}
                data={rowData[cellName]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
