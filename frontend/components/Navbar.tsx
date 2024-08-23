import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <nav className="bg-white border-b border-[#a0627b]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={90}
                            height={40}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-600">
                                    Welcome, {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm bg-[#a0627b] text-white px-3 py-1 rounded-full hover:bg-[#8c556c]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm text-gray-600 hover:text-[#a0627b]">
                                    Login
                                </Link>
                                <Link href="/register" className="text-sm bg-[#a0627b] text-white px-3 py-1 rounded-full hover:bg-[#8c556c]">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
