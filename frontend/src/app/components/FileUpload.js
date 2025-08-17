import React from 'react';

export default function FileUpload({ onChange }) {
    return (
        <label className="mt-2">
            <input
                type="file"
                onChange={(e) => {
                    onChange(e.target.files[0]);
                }}
                accept={".pdf,.docx"}
                className=""
            />
        </label>
    );
}
