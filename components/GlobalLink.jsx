"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function GlobalLink({ href, title, additionalClasses }) {
    const [loading, setLoading] = useState(false);

    return (
        <Link 
            href={href} 
            onClick={() => setLoading(true)} 
            className={`px-8 py-2 md:px-12 md:py-4 md:text-2xl font-bold w-full text-center md:w-fit cursor-pointer rounded-lg relative ${additionalClasses}`}
        >
            <span className={loading ? 'opacity-0' : 'opacity-100'}>{title}</span>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="animate-spin w-5 h-5" />
                </div>
            )}
        </Link>
    );
}