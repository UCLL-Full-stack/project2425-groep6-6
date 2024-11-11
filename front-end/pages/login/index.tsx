import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from "@components/header"; 

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'barman' && password === 'barman123') {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('role', 'barman');
            router.push('/');
        } else if (username === 'cook' && password === 'cook123') {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('role', 'cook');
            router.push('/');
        } else if (username === 'user' && password === 'user123') {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('role', 'user');
            router.push('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username">Username: </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Login
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
