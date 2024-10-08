import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store';

const Home: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1 className="text-4xl font-bold mb-6 text-[#a0627b]">Welcome to Good Deeds</h1>

            {user ? (
                <div>
                    <p className="mb-4 text-gray-700">Hello, {user.username}! Ready to make the world a better place?</p>
                    <Link href="/" className="bg-[#a0627b] hover:bg-[#8c556c] text-white font-bold py-2 px-4 rounded">
                        Start Chatting
                    </Link>
                </div>
            ) : (
                <div>
                    <p className="mb-4 text-gray-700">Join us in making the world a better place, one good deed at a time!</p>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#a0627b]">About Good Deeds</h2>
                <p className="mb-2 text-gray-700">Good Deeds is a platform where you can:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li>Track your good deeds</li>
                    <li>Connect with friends</li>
                    <li>Inspire others to do good</li>
                    <li>Chat about kindness and compassion</li>
                </ul>
                <p className="text-gray-700">Start your journey of kindness today!</p>
                <h2 className="text-xl font-semibold mb-4 text-[#a0627b]">If you want to use Good Deeds you need authentication</h2>
            </div>
        </div>
    );
};

export default Home;
