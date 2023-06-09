import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const headerTitle = screen.getByText(/1 day chat App/i);
  const headerSubTitle = screen.getByText(/All messages will be deleted at every 00:00 UTC/i);
  const userSelectorTitle = screen.getByText(/Choose your user/i);
  const channelSelectorTitle = screen.getByText(/Channels/i);
  
  expect(headerTitle).toBeInTheDocument();
  expect(headerSubTitle).toBeInTheDocument();
  expect(userSelectorTitle).toBeInTheDocument();
  expect(channelSelectorTitle).toBeInTheDocument();
});
