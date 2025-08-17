import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Resume Helper",
  description: "Improve/Tailor Resume and Generate Cover Letters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex flex-col p-8 text-center h-screen">
          {/* Insert NavBar */}
          <h1 className="text-3xl font-bold mb-6">AI Resume Helper</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
