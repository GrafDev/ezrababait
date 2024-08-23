import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { searchUsers, addFriend, getFriends } from '@/store/friendsSlice';
import { User } from '@/types/user';
import { Search, UserPlus } from 'lucide-react';

interface FriendsSidebarProps {
    onFriendSelect: (id: number) => void;
}

const FriendsSidebar: React.FC<FriendsSidebarProps> = ({ onFriendSelect }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const { friends, isLoading, error } = useSelector((state: RootState) => state.friends);

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    const handleSearch = async () => {
        if (searchQuery.startsWith('@') && searchQuery.length > 1) {
            const result = await dispatch(searchUsers(searchQuery));
            if (searchUsers.fulfilled.match(result)) {
                setSearchResults(result.payload as User[]);
            }
        }
    };

    const handleAddFriend = async (friendTag: string) => {
        await dispatch(addFriend(friendTag));
        dispatch(getFriends());
        handleSearch();
    };

    return (
        <div className="w-96 bg-white shadow-lg rounded-lg p-4"> {/* White background, larger shadow, and increased border radius */}
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search friends (@username)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pr-10 border border-gray-300 rounded"
                    />

                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#a0627b] hover:bg-[#8c556c] text-white p-2 rounded-full"
                    >
                        <Search size={18} />
                    </button>
                </div>

            </div>

            {searchResults.length > 0 && (
                <div className="mb-4">
                    <h3 className="font-bold mb-2 text-[#a0627b]">Search Results:</h3>
                    <ul>
                        {searchResults.map((user) => (
                            <li key={user.id} className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">
                                    {user.username} ({user.friendTag})
                                </span>
                                <button
                                    onClick={() => handleAddFriend(user.friendTag)}
                                    className="bg-[#a0627b] hover:bg-[#8c556c] text-white p-1 rounded-full"
                                >
                                    <UserPlus size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <h3 className="font-bold mb-2 text-[#a0627b]">Friends:</h3>
                {isLoading ? (
                    <p className="text-gray-700">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <ul className="max-h-64 overflow-y-auto">
                        {friends.map((friend) => (
                            <li
                                key={friend.id}
                                className="mb-2 cursor-pointer text-gray-700 hover:text-[#a0627b]"
                                onClick={() => onFriendSelect(friend.id)}
                            >
                                {friend.username} ({friend.friendTag})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FriendsSidebar;
