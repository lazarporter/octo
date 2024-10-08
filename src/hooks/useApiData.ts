import { useEffect, useState } from 'react';
import { APIData } from './apiData.types';
import { fetchData } from '../api/fetchData';

export interface ApiRequest {
  data: APIData[];
  error: string | null;
  loading: boolean;
}

const initialRequest: ApiRequest = {
  data: [],
  error: null,
  loading: false,
};

export const useApiData = (): ApiRequest => {
  const [response, setResponse] = useState<ApiRequest>(initialRequest);

  useEffect(() => {
    (async () => {
      try {
        setResponse({ ...initialRequest, loading: true });

        const res = await fetchData();
        setResponse({
          data: res,
          error: null,
          loading: false,
        });
      } catch (err) {
        // Todo: Set different message for different types of errors
        // Todo: Observabilty reporting (ex sentry)

        setResponse({
          ...initialRequest,
          error:
            (err as Error)?.message ??
            'Something went wrong. Please try again.',
        });
      }
    })();
  }, []);

  return response;
};
