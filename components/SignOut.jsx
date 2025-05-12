"use client";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebase/firebaseConfig";
import { useState } from "react";
import { Loader } from 'lucide-react';
import { useRouter } from "next/navigation";

const SignOut = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // 1. Call the backend API to clear the session cookie and revoke tokens
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                const data = await response.json();
                console.error("Logout API error:", data.error || 'Failed to logout from server');
                // Optionally, show an error to the user
                // For now, we'll proceed with client-side logout anyway
            }

            // 2. Sign out from Firebase on the client side
            await signOut(auth);

            // 3. Redirect to home page (or login page)
            // router.refresh(); // Optional: Force a refresh to ensure all states are cleared
            router.push("/");
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };
    return (
        <button
            className="flex items-center justify-center gap-3 px-4 py-2 cursor-pointer bg-muted rounded-lg transition-colors ease-in-out duration-200 font-semibold min-w-[180px] min-h-[40px] md:text-2xl"
            onClick={handleLogout}
        >
            {isLoggingOut ? (
                <Loader className="animate-spin h-5 w-5" />
            ) : (
                "Sign Out"
            )}
        </button>
    );
};

export default SignOut;