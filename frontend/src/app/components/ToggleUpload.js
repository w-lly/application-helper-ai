import React, { useState } from 'react';
import FileUpload from './FileUpload.js';
import ManualInput from './ManualInput.js';

export default function ToggleUpload({ file_onChange, text_value, text_onChange, text_placeholder }) {
  const [uploadFile, setUploadFile] = useState(true);

  function toggleUpload() {
    setUploadFile(!uploadFile);
  }

  return (
    <div className='flex flex-col place-items-center'>

      {/* input toggle */}
      <div className="mt-4">
        <label className="custom_button">
          <button
            type='button'
            onClick={toggleUpload}
          >
            {uploadFile ? "Upload File" : "Text Input"}
          </button>
        </label>
      </div>

      {/* Condition File Upload */}
      {uploadFile && (
        <FileUpload
          onChange={file_onChange}
        />
      )}

      {/* Conditional Textarea (shown only if manual input is selected) */}
      {!uploadFile && (
        <ManualInput
          value={text_value}
          onChange={text_onChange}
          placeholder={text_placeholder}
        />
      )}
    </div>
  );
}