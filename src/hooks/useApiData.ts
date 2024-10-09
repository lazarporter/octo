import { useEffect, useState } from 'react';
import { APIData } from './apiData.types';
import { fetchData } from '../api/fetchData';
import { useErrorBoundary } from 'react-error-boundary';

export interface ApiRequest {
  data: APIData[];
  loading: boolean;
}

const initialRequest: ApiRequest = {
  data: [],
  loading: false,
};

export const useApiData = (): ApiRequest => {
  const [response, setResponse] = useState<ApiRequest>(initialRequest);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    (async () => {
      try {
        setResponse({ ...initialRequest, loading: true });

        const res = await fetchData();

        setResponse({
          data: res,
          loading: false,
        });
      } catch (err) {
        showBoundary(err as Error);
        setResponse({
          ...initialRequest,
        });
        reportError(err as Error);
      }
    })();
  }, [showBoundary]);

  return response;
};
