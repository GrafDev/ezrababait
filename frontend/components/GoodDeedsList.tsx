import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';  // Убедитесь, что вы экспортировали AppDispatch из вашего store
import { GoodDeed } from '@/types/goodDeed';
import { completeGoodDeed } from '@/store/goodDeedsSlice';

interface GoodDeedsListProps {
    goodDeeds: GoodDeed[];
}

const GoodDeedsList: React.FC<GoodDeedsListProps> = ({ goodDeeds }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleComplete = (id: number) => {
        dispatch(completeGoodDeed(id));
    };

    return (
        <ul className="space-y-4">
            {goodDeeds.map((deed) => (
                <li key={deed.id} className={`bg-white p-4 rounded shadow ${deed.completed ? 'opacity-50' : ''}`}>
                    <h3 className="text-lg font-semibold">{deed.title}</h3>
                    <p className="text-gray-600">{deed.description}</p>
                    {!deed.completed && (
                        <button
                            onClick={() => handleComplete(deed.id)}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Complete
                        </button>
                    )}
                    {deed.completed && (
                        <span className="mt-2 inline-block bg-gray-300 text-gray-800 px-4 py-2 rounded">
              Completed
            </span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default GoodDeedsList;
