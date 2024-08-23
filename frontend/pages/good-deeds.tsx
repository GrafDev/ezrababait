import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState, AppDispatch } from '@/store';
import { fetchGoodDeeds } from '@/store/goodDeedsSlice';
import GoodDeedsList from '@/components/GoodDeedsList';
import AddGoodDeedForm from '@/components/AddGoodDeedForm';
import FriendsSidebar from '@/components/FriendsSidebar';

const GoodDeeds: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { goodDeeds, isLoading, error } = useSelector((state: RootState) => state.goodDeeds);
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            dispatch(fetchGoodDeeds());
        }
    }, [user, dispatch, router]);

    const handleFriendSelect = (id: number) => {
        setSelectedFriendId(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <FriendsSidebar onFriendSelect={handleFriendSelect} />
            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-[#a0627b]">Your Good Deeds</h1>
                <AddGoodDeedForm />
                <GoodDeedsList goodDeeds={goodDeeds} />
                {selectedFriendId && (
                    <div>
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-[#a0627b]">Friend's Good Deeds</h2>
                        {/* Here we'll add the component to display friend's good deeds */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoodDeeds;
