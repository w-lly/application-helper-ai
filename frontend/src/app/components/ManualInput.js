import React from 'react';

export default function ManualInput({ value, onChange, placeholder }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows="6"
            className="w-full mt-2 p-2 border border-gray-300 rounded"
        />
    );
}
