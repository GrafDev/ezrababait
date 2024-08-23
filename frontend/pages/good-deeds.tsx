import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState, AppDispatch } from '@/store';
import { fetchGoodDeeds, fetchFriendGoodDeeds } from '@/store/goodDeedsSlice';
import GoodDeedsList from '@/components/GoodDeedsList';
import AddGoodDeedForm from '@/components/AddGoodDeedForm';
import FriendsSidebar from '@/components/FriendsSidebar';
import FriendGoodDeedsList from '@/components/FriendGoodDeedsList';

const GoodDeeds: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { goodDeeds, friendGoodDeeds, isLoading, error } = useSelector((state: RootState) => state.goodDeeds);
    const { friends } = useSelector((state: RootState) => state.friends);
    const [selectedFriend, setSelectedFriend] = useState<{ id: number; username: string } | null>(null);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            dispatch(fetchGoodDeeds());
        }
    }, [user, dispatch, router]);

    const handleFriendSelect = (id: number) => {
        const friend = friends.find(f => f.id === id);
        if (friend) {
            setSelectedFriend({ id: friend.id, username: friend.username });
            dispatch(fetchFriendGoodDeeds(id));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <FriendsSidebar onFriendSelect={handleFriendSelect} />
            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-[#a0627b]">{user ? user.username : ''}'s Good Deeds</h1>
                <AddGoodDeedForm />
                <GoodDeedsList goodDeeds={goodDeeds} />
                {selectedFriend && (
                    <div>
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#a0627b]">{selectedFriend.username}'s Good Deeds</h2>
                        <FriendGoodDeedsList goodDeeds={friendGoodDeeds} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoodDeeds;
