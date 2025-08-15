"use client";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { useRef, useState } from "react";

export default function ImprovePage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualInput, setManualInput] = useState(""); // Manual text input


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
    <main className="p-6 mx-auto">
      <div className='flex flex-col place-items-center'>

        <div className="grid col-span-full place-items-center">
          <Link href="/" className="text-blue-500 underline block mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold mb-4">AI Resume Helper - improve your resume</h1>

          <form onSubmit={handleSubmit} className="mb-4">
            {/* File upload button */}
            <label className="custom_button">
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setManualInput(""); // Clear manual input if file is selected
                }}
                accept=".pdf,.docx"
                ref={fileInputRef}
                className="hidden"
              />
              {file ? "Change" : "Select"} Resume
            </label>

            {/* Manual text input option */}
            <div className="mt-4">
              <label className="custom_button">
                <input
                  type="radio"
                  name="inputOption"
                  checked={!file} // If there's no file, this option is selected
                  onChange={() => {
                    setFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""; // Correctly reset the file input field
                    }
                    setManualInput(""); // Clear any text if switching to manual input
                  }}
                />
                Manual Text Input
              </label>
            </div>

            {/* Textarea for manual input */}
            {!file && (
              <textarea
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Type or paste your resume here..."
                rows="6"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="custom_button mt-4"
              disabled={loading}
            >
              {loading ? "Processing..." : "Improve Resume"}
            </button>
          </form>
        </div>

        {result &&
          <div className="max-h-[80vh] overflow-y-auto prose prose-sm max-w-[50vw] bg-gray-50 p-4 rounded">
            <ReactMarkdown>
              {result}
            </ReactMarkdown>
          </div>
        }
      </div>
    </main>
  );
}