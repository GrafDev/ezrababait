import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoodDeed } from '@/store/goodDeedsSlice';
import { AppDispatch } from '@/store';

const AddGoodDeedForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addGoodDeed({ title, description }));
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <button type="submit" className="w-full p-2 text-white bg-[#a0627b] rounded hover:bg-[#8c556c]">
                Add Good Deed
            </button>
        </form>
    );
};

export default AddGoodDeedForm;
