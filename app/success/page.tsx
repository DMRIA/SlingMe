"use client";

import Link from "next/link";
import { Header } from "../components/Header";

export default function SuccessPage() {
    return (
        <main className="bg-dark-900 min-h-screen">
            <Header />
            <div className="pt-32 pb-12 px-4 max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-white mb-6">Booking Request Received!</h1>
                <p className="text-xl text-gray-300 mb-12">
                    Your Slingshot is reserved. To finalize your booking, please complete the payment via Venmo.
                </p>

                <div className="bg-dark-800 border border-white/10 rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Payment Instructions</h2>
                    <div className="p-4 bg-blue-500/10 rounded-xl mb-6">
                        <p className="text-blue-200 font-mono text-lg">@Mom-Slingshot-Biz</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">
                        Please include your Name and Booking Date in the payment note.
                    </p>
                    <a
                        href="https://venmo.com"
                        target="_blank"
                        className="inline-block w-full bg-[#008CFF] hover:bg-[#0074D4] text-white font-bold py-4 px-8 rounded-xl transition-colors"
                    >
                        Open Venmo
                    </a>
                </div>

                <Link href="/" className="text-primary hover:text-white transition-colors font-medium">
                    Return Home
                </Link>
            </div>
        </main>
    );
}
