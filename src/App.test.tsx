import { render, screen } from '@testing-library/react';
import App from './App';
import { fetchData } from './api/fetchData';

// Mock the fetchData function
jest.mock('./api/fetchData');

const TEST_ERROR_MSG = 'Test error';

describe('App', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders error fallback when an error occurs', async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error(TEST_ERROR_MSG));
    render(<App />);

    // fetchData rejection takes some time, waiting for error msg to appear
    const messageElement = await screen.findByText(TEST_ERROR_MSG);
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });
});
