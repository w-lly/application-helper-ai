'use client';
import Link from 'next/link';

import { useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <Link href="/improve" className="custom_button">
        General Resume Improvements
      </Link>
      <Link href="/tailor" className="custom_button">
        Tailor Resume to Job
      </Link>
      <Link href="/cover-letter" className="custom_button">
        Generate Cover Letter
      </Link>
    </div>
  );
}