import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, login } from '@/store/authSlice';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Login
            </button>
        </form>
    );
};

export default Login;
