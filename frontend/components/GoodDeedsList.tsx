import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { GoodDeed } from '@/types/goodDeed';
import { completeGoodDeed, uncompleteGoodDeed } from '@/store/goodDeedsSlice';
import { CheckCircle, Circle } from 'lucide-react';

interface GoodDeedsListProps {
    goodDeeds: GoodDeed[];
}

const GoodDeedsList: React.FC<GoodDeedsListProps> = ({ goodDeeds }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleToggleComplete = (deed: GoodDeed) => {
        if (deed.completed) {
            dispatch(uncompleteGoodDeed(deed.id));
        } else {
            dispatch(completeGoodDeed(deed.id));
        }
    };

    if (!Array.isArray(goodDeeds) || goodDeeds.length === 0) {
        return <p>No good deeds found.</p>;
    }

    return (
        <ul className="space-y-4">
            {goodDeeds.map((deed) => (
                <li key={deed.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                    <div className={deed.completed ? 'opacity-50' : ''}>
                        <h3 className="text-lg font-semibold">{deed.title}</h3>
                        <p className="text-gray-600">{deed.description}</p>
                    </div>
                    <button
                        onClick={() => handleToggleComplete(deed)}
                        className={`transition-colors duration-200 ${
                            deed.completed ? 'text-green-500 hover:text-gray-400' : 'text-gray-400 hover:text-green-500'
                        }`}
                        aria-label={deed.completed ? "Mark as uncompleted" : "Mark as completed"}
                    >
                        {deed.completed ? (
                            <CheckCircle className="h-6 w-6" />
                        ) : (
                            <Circle className="h-6 w-6" />
                        )}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default GoodDeedsList;
