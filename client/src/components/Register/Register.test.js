import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import '@testing-library/jest-dom';



// Mock the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] }), // Simulate available username
    })
);

describe('Register Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders the register form', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(screen.getByText(/Register/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('shows error messages for required fields', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Confirm password is required/i)).toBeInTheDocument();
    });

    test('validates email format', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.blur(screen.getByLabelText(/Email/i));
        
        expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument();
    });

    test('validates password complexity', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
        fireEvent.blur(screen.getByLabelText(/Password/i));

        expect(await screen.findByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'NoSpecial1' } });
        fireEvent.blur(screen.getByLabelText(/Password/i));

        expect(await screen.findByText(/Password must contain at least one special character/i)).toBeInTheDocument();
    });

    test('checks username availability', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.blur(screen.getByLabelText(/Username/i));

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/accounts?filters[username][$eq]=testuser'));
        await waitFor(() => expect(screen.queryByText(/Username is already taken/i)).not.toBeInTheDocument());
    });

    test('registers a new user successfully', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'User registered successfully' }),
            })
        );

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'ValidPass!123' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'ValidPass!123' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                process.env.REACT_APP_DEV_URL + '/api/accounts',
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({
                        data: {
                            username: 'testuser',
                            email: 'test@example.com',
                            password: 'ValidPass!123',
                        },
                    }),
                })
            );
        });
        
        expect(screen.queryByText(/User registered successfully/i)).toBeInTheDocument();
    });

    test('displays error message on registration failure', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Registration failed' }),
            })
        );

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'ValidPass!123' } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'ValidPass!123' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });
});
