import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('renders email, password input fields', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Enter login ID');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
