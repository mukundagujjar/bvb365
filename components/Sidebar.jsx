"use client"

import { useState } from 'react';
import SidebarItem from "@/components/SidebarItem";
import { Settings, Menu, X, ShipWheel, ChartLine, Shell } from "lucide-react";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebase/firebaseConfig"; // Your client auth instance
// import { SignOut } from '@/lib/auth-utils';
import { useRouter } from "next/navigation";
import Image from 'next/image';

const routes = [
    {
        name: "Investments",
        href: "/investments",
        icon: <ShipWheel className="h-4 w-4" />
    },
    {
        name: "Growth Tracker",
        href: "/growth-tracker",
        icon: <ChartLine className="h-4 w-4" />
    },
    // {
    //     name: "Circle of Control",
    //     href: "/circle-of-control",
    //     icon: <Shell className="h-4 w-4" />
    // },
    {
        name: "Settings",
        href: "/settings",
        icon: <Settings className="h-4 w-4" />
    }
];

const Sidebar = () => {

    const router = useRouter();
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
            console.error("Logout process error:", error);
            // Handle any errors during the logout process (e.g., network issue)
            // Optionally, show an error to the user
        } finally {
            setIsLoggingOut(false);
            setIsSidebarOpen(false); // Close sidebar on logout
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    return (
        <>
            {/* Mobile Hamburger Menu */}
            <div className={`lg:hidden fixed top-4 left-4 z-10 ${isSidebarOpen ? 'hidden' : ''}`}>
                <button onClick={toggleSidebar} className='flex items-center justify-center p-2 rounded-lg'>
                    <Menu className="h-4 w-4" />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed lg:relative
                h-full 
                lg:w-1/5 w-60
                bg-background
                transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col p-4 gap-5
                border-r
                z-40
            `}>
                {/* Close Button (Mobile Only) */}
                <div className="lg:hidden absolute top-2 right-2">
                    <button onClick={toggleSidebar} className='flex items-center justify-center p-2 rounded-lg'>
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* <div className="w-full hidden lg:flex items-center justify-center rounded-lg bg-muted py-1">
                    <Image src="bvb-navbar.svg" alt="logo" width={"200"} height={"200"} />
                </div> */}

                {/* Routes */}
                <div className="w-full flex flex-col items-center justify-center gap-4 overflow-y-auto mt-10 lg:mt-0">
                    {routes.map((route, index) => (
                        <SidebarItem
                            key={index}
                            href={route.href}
                            name={route.name}
                            icon={route.icon}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </div>

                <div className="w-full mt-auto">
                    <form action={handleLogout}>
                        <button disabled={isLoggingOut} className="w-full cursor-pointer">
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 lg:hidden z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    )
}

export default Sidebar