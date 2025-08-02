'use client';
import Link from 'next/link';

import { useState } from "react";

export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">AI Resume Helper</h1>
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <Link href="/improve" className="bg-blue-600 text-white p-3 rounded text-center">
            General Resume Improvements
          </Link>
          <Link href="/tailor" className="bg-green-600 text-white p-3 rounded text-center">
            Tailor Resume to Job
          </Link>
          <Link href="/cover-letter" className="bg-purple-600 text-white p-3 rounded text-center">
            Generate Cover Letter
          </Link>
        </div>
    </main>
  );
}