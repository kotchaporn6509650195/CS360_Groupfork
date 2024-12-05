import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import '@testing-library/jest-dom';
import { AuthContext } from '../AuthContext';

// Mock the global fetch function
global.fetch = jest.fn();

const renderRegister = () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
};

const renderLogin = () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
};

const mockFetchResponse = (response) => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => response,
    });
};

describe('Register Component - Tests', () => {
    beforeEach(() => {
        fetch.mockClear(); // Clear previous mock calls before each test
    });

    test('renders the register form', () => {
        renderRegister();

        expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('shows error when username is shorter than 5 characters', async () => {
        renderRegister();
    
        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'usr' } }); // Username less than 5 characters
        fireEvent.blur(usernameInput);
    
        await waitFor(() => {
            expect(screen.getByText(/Username must be at least 5 characters long/i)).toBeInTheDocument();
        });
    });

    test('shows error message for invalid email format', async () => {
        renderRegister();
        const emailInput = screen.getByLabelText(/Email/i);

        fireEvent.change(emailInput, { target: { value: 'invalidEmailFormat' } });
        fireEvent.blur(emailInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
        });
    });

    test('shows error for password less than 8 characters', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
        });
    });

    test('shows error for password without uppercase letter', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(passwordInput, { target: { value: 'lowercasepassword' } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();
        });
    });

    test('shows error for password without a number', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(passwordInput, { target: { value: 'Password!' } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least one number/i)).toBeInTheDocument();
        });
    });

    test('shows error when passwords do not match', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');

        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password2!' } });
        fireEvent.blur(confirmPasswordInput);

        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    test('shows error when required fields are missing', async () => {
        renderRegister();
        fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
        });
    });

    test('successfully registers user and navigates to login', async () => {
        mockFetchResponse({ success: true });

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newUsername' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Login/i)).toBeInTheDocument();
        });
    });

});