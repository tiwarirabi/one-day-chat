import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header', () => {
  render(<Header />);
  const headerTitle = screen.getByText(/1 day chat App/i);
  const headerSubTitle = screen.getByText(/All messages will be deleted at every 00:00 UTC/i);
  
  
  expect(headerTitle).toBeInTheDocument();
  expect(headerSubTitle).toBeInTheDocument();
});
