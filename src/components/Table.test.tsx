/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import { Table } from './Table';
import { staticData } from '../api/fetchData';

describe('Table', () => {
  it('renders loading state', () => {
    render(<Table data={[]} loading={true} error={null} />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <Table data={[]} loading={false} error={'The server is on fire.'} />
    );
    expect(screen.getByText('The server is on fire.')).toBeInTheDocument();
  });

  it('renders data', () => {
    render(<Table data={staticData} loading={false} error={null} />);

    const first = staticData[0];
    const last = staticData[staticData.length - 1];
    expect(screen.getByText((content) => content.includes(first._id)));
    expect(screen.getByText((content) => content.includes(last._id)));
  });
});
