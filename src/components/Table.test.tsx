/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import { Table } from './Table';
import { staticData } from '../assets/staticData';
import { useApiData } from '../hooks/useApiData';
import { TEST_IDS } from '../stringContants';

jest.mock('../hooks/useApiData');

describe('Table', () => {
  beforeEach(() => {
    (useApiData as jest.Mock).mockClear();
  });

  it('renders loading state', () => {
    (useApiData as jest.Mock).mockReturnValue({ loading: true, data: null });

    render(<Table />);

    expect(
      screen.getByTestId(TEST_IDS.TABLE_LOADING_SPINNER)
    ).toBeInTheDocument();
  });

  it('renders no data state', () => {
    (useApiData as jest.Mock).mockReturnValue({ loading: false, data: null });

    render(<Table />);

    expect(screen.getByTestId(TEST_IDS.TABLE_NO_DATA)).toBeInTheDocument();
  });

  it('renders data', () => {
    (useApiData as jest.Mock).mockReturnValue({
      loading: false,
      data: staticData,
    });

    render(<Table />);

    const first = staticData[0];
    const last = staticData[staticData.length - 1];

    expect(screen.getByTestId(TEST_IDS.TABLE_DATA)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(first._id)));
    expect(screen.getByText((content) => content.includes(last._id)));
  });
});
