import React from 'react';
import { GoodDeed } from '@/types/goodDeed';

interface FriendGoodDeedsListProps {
    goodDeeds: GoodDeed[];
}

const FriendGoodDeedsList: React.FC<FriendGoodDeedsListProps> = ({ goodDeeds }) => {
    if (goodDeeds.length === 0) {
        return <p>This friend hasn't added any good deeds yet.</p>;
    }

    return (
        <ul className="space-y-4">
            {goodDeeds.map((deed) => (
                <li key={deed.id} className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">{deed.title}</h3>
                    <p className="text-gray-600">{deed.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default FriendGoodDeedsList;
