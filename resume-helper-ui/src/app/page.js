"use client";

import { useState } from "react";

export default function Home() {
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
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Resume Helper</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.docx"
          className="mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Improve Resume"}
        </button>
      </form>

      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {result}
      </pre>
    </main>
  );
}