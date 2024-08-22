// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                    Good Deeds
                </Link>
                <div>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-white mr-4">
                                Dashboard
                            </Link>
                            <Link href="/friends" className="text-white mr-4">
                                Friends
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-white mr-4">
                                Login
                            </Link>
                            <Link href="/register" className="text-white">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
