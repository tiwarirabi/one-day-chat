import React from 'react';
import { render, screen } from '@testing-library/react';
import LeftSidebar from './LeftSidebar';
import { MemoryRouter } from 'react-router-dom';

test('renders LeftSidebar', () => {
  render(<MemoryRouter><LeftSidebar /></MemoryRouter>);
  const userSelectorTitle = screen.getByText(/Choose your user/i);
  const channelSelectorTitle = screen.getByText(/Channels/i);
  
  expect(userSelectorTitle).toBeInTheDocument();
  expect(channelSelectorTitle).toBeInTheDocument();
});
