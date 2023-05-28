import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('add task', () => {
  render(<App />);
  const linkElement = screen.getByText(/追加/i);
  expect(linkElement).toBeInTheDocument();
});