import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState, AppDispatch } from '@/store';
import { fetchGoodDeeds } from '@/store/goodDeedsSlice';
import GoodDeedsList from '@/components/GoodDeedsList';
import AddGoodDeedForm from '@/components/AddGoodDeedForm';

const GoodDeeds: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { goodDeeds, isLoading, error } = useSelector((state: RootState) => state.goodDeeds);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            dispatch(fetchGoodDeeds());
        }
    }, [user, dispatch, router]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-[#a0627b]">Your Good Deeds</h1>
            <AddGoodDeedForm />
            <GoodDeedsList goodDeeds={goodDeeds} />
        </div>
    );
};

export default GoodDeeds;
