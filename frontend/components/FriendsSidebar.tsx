import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { searchUsers, addFriend, getFriends } from '@/store/friendsSlice';
import { User } from '@/types/user';

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
            const results = await dispatch(searchUsers(searchQuery));
            setSearchResults(results.payload as User[]);
        }
    };

    const handleAddFriend = (friendTag: string) => {
        dispatch(addFriend(friendTag));
    };

    return (
        <div className="w-64 bg-white shadow-md p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search friends (@username)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
                >
                    Search
                </button>
            </div>

            {searchResults.length > 0 && (
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Search Results:</h3>
                    <ul>
                        {searchResults.map((user) => (
                            <li key={user.id} className="flex justify-between items-center mb-2">
                                {user.username} ({user.friendTag})
                                <button
                                    onClick={() => handleAddFriend(user.friendTag)}
                                    className="bg-green-500 text-white p-1 rounded"
                                >
                                    +
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <h3 className="font-bold mb-2">Friends:</h3>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <ul className="max-h-64 overflow-y-auto">
                        {friends.map((friend) => (
                            <li
                                key={friend.id}
                                className="mb-2 cursor-pointer hover:text-blue-500"
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
