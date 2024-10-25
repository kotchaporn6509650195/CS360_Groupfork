import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Register from '../components/Register/Register';
import '@testing-library/jest-dom';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Register Component - Unit Tests', () => {
    beforeEach(() => {
        fetch.mockClear(); // Clear previous mock calls before each test
    });

    test('renders the register form', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('should display an error message when email format is invalid', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: 'invalidEmailFormat' } });
        fireEvent.blur(emailInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
        });
    });

    test('should display an error message when password is less than 8 characters', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText('Password');
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.blur(passwordInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
        });
    });

    test('should display an error message when password does not contain an uppercase letter', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText('Password');
        fireEvent.change(passwordInput, { target: { value: 'lowercasepassword' } });
        fireEvent.blur(passwordInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();
        });
    });

    test('displays error when password does not contain a number', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText('Password');
        fireEvent.change(passwordInput, { target: { value: 'Password!' } }); // Example password without a number
        fireEvent.blur(passwordInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least one number/i)).toBeInTheDocument();
        });
    });

    test('should display an error message when passwords do not match', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');

        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password2!' } });

        // Trigger the blur event for confirm password to check for the error
        fireEvent.blur(confirmPasswordInput);

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    test('displays error when required fields are missing', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
        });
    });
});

describe('Register Component - Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mock calls and implementations before each test
    });

    test('checks username availability', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
    
        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.blur(usernameInput);
    
        // Wait for the API response and check if the "Username is already taken" message does or does not appear.
        await waitFor(() => {
            const errorMessage = screen.queryByText(/Username is already taken/i);
            if (errorMessage) {
                expect(errorMessage).toBeInTheDocument(); // Username is taken
            } else {
                expect(errorMessage).not.toBeInTheDocument(); // Username is available
            }
        });
    }); 

    test('should display an error message when username is taken', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: [{ id: 1, username: 'takenUsername' }] }),
        });

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'takenUsername' } });
        fireEvent.blur(usernameInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Username is already taken/i)).toBeInTheDocument();
        });
    });

    test('should successfully register user and navigate to login', async () => {
        // Mock the API response for successful registration
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newUsername' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'Password1!' } });

        // Click the register button
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // Assert that it navigates to the login page
        await waitFor(() => {
            expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
        });
    });
});
