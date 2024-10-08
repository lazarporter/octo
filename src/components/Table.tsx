import { ApiRequest } from '../hooks/useApiData';

export const Table: React.FC<ApiRequest> = ({ loading, data, error }) => {
  if (loading) {
    // Todo make this a pretty component
    return <div>loading...</div>;
  }

  if (error) {
    // Todo make this a pretty component
    return <div>{error}</div>;
  }

  return <div>Table: {JSON.stringify(data)}</div>;
};
