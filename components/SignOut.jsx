"use client";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebase/firebaseConfig";
import { useState } from "react";
import { Loader } from 'lucide-react';
const SignOut = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
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
            className="font-bold py-2 px-4 rounded-lg bg-foreground text-background w-full md:w-fit"
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