/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import { Table } from './Table';
import { staticData } from '../assets/staticData';

import { TEST_IDS } from '../stringContants';

describe('Table', () => {
  it('renders data', () => {
    render(<Table data={staticData} />);

    const first = staticData[0];
    const last = staticData[staticData.length - 1];

    expect(screen.getByTestId(TEST_IDS.TABLE_DATA)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(first._id)));
    expect(screen.getByText((content) => content.includes(last._id)));
  });
});
