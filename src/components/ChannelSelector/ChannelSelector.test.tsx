import React from 'react';
import { render, screen } from '@testing-library/react';
import ChannelSelector from './ChannelSelector';
import { MemoryRouter } from 'react-router-dom';

test('renders ChannelSelector', () => {
  render(<MemoryRouter><ChannelSelector  /></MemoryRouter>);
  
  const channelSelectorTitle = screen.getByText(/Channels/i);

  expect(channelSelectorTitle).toBeInTheDocument();
});
