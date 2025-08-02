"use client";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { useState } from "react";

export default function ImprovePage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return alert("Please upload a file.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/improve-resume/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.improved_resume);
    setLoading(false);
  }

  return (
    <main className="p-6 mx-auto">
        <div className="grid col-span-full place-items-center">
            <Link href="/" className="text-blue-500 underline block mb-4">
                ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold mb-4">AI Resume Helper</h1>
            
            <form onSubmit={handleSubmit} className="mb-4">
                <label
                className="custom_button"
                >
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept=".pdf,.docx"
                        className="hidden"
                    />
                    {file ? "Change" : "Select"} File
                </label>
                <button
                type="submit"
                className="custom_button"
                disabled={loading}
                >
                    {loading ? "Processing..." : "Improve Resume"}
                </button>
            </form>
        </div>

      <div className="max-h-[80vh] overflow-y-auto prose prose-sm max-w-[50vw] bg-gray-50 p-4 rounded">
        <ReactMarkdown>
            {result}
        </ReactMarkdown>
      </div>
    </main>
  );
}