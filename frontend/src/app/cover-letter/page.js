"use client";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { useRef, useState } from "react";

export default function TailorPage() {
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualInput, setManualInput] = useState(""); // Manual text input

  // Reference to the file input element
  const fileInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!resume || !(job || manualInput)) return alert("Please upload files.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file_resume", resume);
    // Append job file if provided
    if (job) {
      formData.append("file_job", job);
    }

    // Append manual input if provided
    if (manualInput) {
      formData.append("manualInput", manualInput);
    }

    try {
      const res = await fetch("http://localhost:8000/cover-letter/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.cover_letter);
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
          <h1 className="text-2xl font-bold mb-4">AI Resume Helper - generate cover letter</h1>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex flex-wrap items-start gap-4">
              {/* Resume Upload */}
              <label className="custom_button">
                <input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept=".pdf,.docx"
                  className="hidden"
                />
                {resume ? "Change" : "Select"} Resume
              </label>

              {/* Job Description Upload */}
              <div className='flex flex-col'>
                <label className="custom_button">
                  <input
                    type="file"
                    onChange={(e) => {
                      setJob(e.target.files[0]);
                      setManualInput(""); // Clear manual input if file is selected
                    }}
                    accept=".pdf,.docx"
                    ref={fileInputRef}
                    className="hidden"
                  />
                  {job ? "Change" : "Select"} Job Description
                </label>

                {/* Manual Text Input Toggle */}
                <label className="custom_button flex items-center">
                  <input
                    type="radio"
                    name="inputOption"
                    checked={!job} // If there's no file, this option is selected
                    onChange={() => {
                      setJob(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ""; // Reset file input
                      }
                      setManualInput(""); // Clear any text
                    }}
                    className="mr-2"
                  />
                  Manual Text Input
                </label>

                {/* Conditional Textarea (shown only if manual input is selected) */}
                {!job && (
                  <textarea
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Type or paste your job description here..."
                    rows="6"
                    className="w-full mt-4 p-2 border border-gray-300 rounded"
                  />
                )}
              </div>

            </div>

            <button
              type="submit"
              className="custom_button"
              disabled={loading}
            >
              {loading ? "Processing..." : "Generate Cover Letter"}
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