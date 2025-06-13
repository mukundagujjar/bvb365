"use client";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebase/firebaseConfig";
import { useState } from "react";
import { Loader } from 'lucide-react';
import { useRouter } from "next/navigation";

const SignOut = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };
    return (
        <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-3 px-4 py-2 cursor-pointer bg-muted text-muted-foreground rounded-lg transition-colors ease-in-out duration-200 font-semibold relative"
      disabled={loading} // Disable button while loading
    >
      <span className={`flex items-center gap-3 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        Sign Out
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="w-5 h-5 animate-spin" />
        </div>
      )}
    </button>
    );
};

export default SignOut;