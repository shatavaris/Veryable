import React from 'react';
import { render } from '@testing-library/react';
import UserList from './App';

test('renders without crashing', () => {
  const { getByText } = render(<UserList />);
  const headerElement = getByText(/users/i);
  expect(headerElement).toBeInTheDocument();
});
