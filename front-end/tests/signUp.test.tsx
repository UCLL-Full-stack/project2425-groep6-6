import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '@components/users/userSignUpForm';
import { useTranslation } from 'next-i18next';
import LoginService from '@services/loginService';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@services/loginService', () => ({
  signup: jest.fn(),
}));

describe('SignupForm', () => {
  const mockSignup = LoginService.signup as jest.Mock;
  const mockUseTranslation = useTranslation as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key, 
    });

    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });

    mockSignup.mockClear();
  });

  test('renders the form with required fields', () => {
    render(<SignupForm role="admin" />);

    expect(screen.getByLabelText('signup.username')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.firstname')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.lastname')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.password')).toBeInTheDocument();
    expect(screen.getByText('signup.signupButton')).toBeInTheDocument();
  });

  test('displays success message when signup is successful', async () => {
    const mockSuccessResponse = { message: 'User created successfully' };
    mockSignup.mockResolvedValue(mockSuccessResponse);

    render(<SignupForm role="admin" />);

    fireEvent.change(screen.getByLabelText('signup.username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText('signup.firstname'), { target: { value: 'New' } });
    fireEvent.change(screen.getByLabelText('signup.lastname'), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('signup.password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('signup.signupButton'));

    await waitFor(() => expect(screen.getByText('signup.userCreatedSuccess')).toBeInTheDocument());
  });

  test('displays error message when user already exists', async () => {
    const mockErrorResponse = { message: 'User already exists' };
    mockSignup.mockRejectedValue(mockErrorResponse);

    render(<SignupForm role="admin" />);

    fireEvent.change(screen.getByLabelText('signup.username'), { target: { value: 'existinguser' } });
    fireEvent.change(screen.getByLabelText('signup.firstname'), { target: { value: 'Existing' } });
    fireEvent.change(screen.getByLabelText('signup.lastname'), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('signup.password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('signup.signupButton'));

    await waitFor(() => expect(screen.getByText('signup.usernameExists')).toBeInTheDocument());
  });

  test('displays validation errors when fields are empty or invalid', async () => {
    render(<SignupForm role="admin" />);
  
    fireEvent.click(screen.getByText('signup.signupButton'));
  
    expect(await screen.findByLabelText('signup.username'));
    expect(await screen.findByLabelText('signup.firstname'));
    expect(await screen.findByLabelText('signup.lastname'));
    expect(await screen.findByLabelText('signup.password'));
  });
  

  test('displays password validation error when password is too short', async () => {
    render(<SignupForm role="admin" />);

    fireEvent.change(screen.getByLabelText('signup.username'), { target: { value: 'shortpassworduser' } });
    fireEvent.change(screen.getByLabelText('signup.firstname'), { target: { value: 'Short' } });
    fireEvent.change(screen.getByLabelText('signup.lastname'), { target: { value: 'Password' } });
    fireEvent.change(screen.getByLabelText('signup.password'), { target: { value: 'short' } });

    fireEvent.click(screen.getByText('signup.signupButton'));

    await waitFor(() => expect(screen.getByText('password needs to be at least 6 characters')).toBeInTheDocument());
  });
});
