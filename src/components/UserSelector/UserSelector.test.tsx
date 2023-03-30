import React from 'react';
import { render, screen } from '@testing-library/react';
import UserSelector from './UserSelector';

test('renders UserSelector', () => {
  render(<UserSelector />);
  const userSelectorTitle = screen.getByText(/Choose your user/i);
  expect(userSelectorTitle).toBeInTheDocument();
});
