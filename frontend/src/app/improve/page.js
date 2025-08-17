"use client";
import ReactMarkdown from 'react-markdown';
import { useRef, useState } from "react";
import ToggleUpload from '../components/ToggleUpload.js';

export default function ImprovePage() {
  const [file, setFile] = useState(null);
  const [manualInput, setManualInput] = useState(""); // Manual text input
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  // Reference to the file input element
  const fileInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file && !manualInput) return alert("Please upload a file or input text.");

    setLoading(true);
    const formData = new FormData();
    // Append file if provided
    if (file) {
      formData.append("file", file);
    }

    // Append manual input if provided
    if (manualInput) {
      formData.append("manualInput", manualInput);
    }

    try {
      const res = await fetch("http://localhost:8000/improve-resume/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.improved_resume);
    }
    catch (error) {
      console.error("Error during submission:", error);
      alert("Something went wrong!");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-row justify-between w-full h-full'>
      <div className='flex items-center justify-center w-full h-full'>
        <form onSubmit={handleSubmit} className="flex flex-col place-items-center mb-4">

          <ToggleUpload
            file_onChange={setFile}
            text_value={manualInput}
            text_onChange={setManualInput}
            text_placeholder={"Type or paste your resume here..."}
          />

          <button type="submit" className="custom_button mt-4" disabled={loading}>
            {loading ? "Processing..." : "Improve Resume"}
          </button>

        </form>

      </div>
      {/* {result && !loading && ( */}
      <div className={`max-h-[90vh] h-full max-w-[50vw] overflow-y-auto prose prose-sm bg-gray-50 p-4 rounded transition-all duration-2000 ease-in-out ${result && !loading ? "w-full opacity-100" : "w-0 opacity-0"}`}>
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
      {/* )} */}
    </div>
  );
}