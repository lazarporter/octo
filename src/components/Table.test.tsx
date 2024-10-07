/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  it('renders loading state', () => {
    render(<Table data={[]} loading={true} error={null} />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});
