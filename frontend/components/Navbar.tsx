import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { User } from 'lucide-react';

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <nav className="bg-white border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-pink-500">Good Deeds</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <Link href="/friends" className="text-gray-600 hover:text-pink-500 flex items-center">
                                <User className="w-5 h-5 mr-1" />
                                <span className="text-sm">Friends</span>
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="text-sm bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm text-gray-600 hover:text-pink-500">
                                    Login
                                </Link>
                                <Link href="/register" className="text-sm bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600">
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
