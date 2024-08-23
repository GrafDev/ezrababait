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
        <div className="flex justify-center items-center h-full ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold text-center text-[#a0627b] mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a0627b]"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a0627b]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-[#a0627b] rounded hover:bg-[#8c556c] transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
