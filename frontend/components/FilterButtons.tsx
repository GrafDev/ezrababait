import React from 'react';

type FilterType = 'all' | 'completed' | 'uncompleted';

interface FilterButtonsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="mb-4 flex items-center">
            <span className="mr-4">Show:</span>
            <button
                onClick={() => onFilterChange('all')}
                className={`px-4 py-2 rounded-l ${currentFilter === 'all' ? 'bg-[#a0627b] text-white' : 'bg-gray-200'}`}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange('completed')}
                className={`px-4 py-2 ${currentFilter === 'completed' ? 'bg-[#a0627b] text-white' : 'bg-gray-200'}`}
            >
                Completed
            </button>
            <button
                onClick={() => onFilterChange('uncompleted')}
                className={`px-4 py-2 rounded-r ${currentFilter === 'uncompleted' ? 'bg-[#a0627b] text-white' : 'bg-gray-200'}`}
            >
                Uncompleted
            </button>
        </div>
    );
};

export default FilterButtons;
