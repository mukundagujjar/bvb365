"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { usePathname, useRouter } from 'next/navigation';

const PROTECTED_ROUTES = ['/dashboard', '/profile'];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setAuthChecked(true);

      // Auto-redirect logic
      if (currentUser && pathname === '/login') {
        // User is authenticated and on login page, redirect to dashboard
        router.push('/dashboard');
      } else if (!currentUser && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        // User is not authenticated but trying to access protected route
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
