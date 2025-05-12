"use client"

import SignInWithGoogle from "@/components/SignInWithGoogle";
import { useAuth } from "@/app/context/AuthContext";
import SignOut from "@/components/SignOut";
import GlobalLink from "@/components/GlobalLink";

const LoginPage =  () => {
  const {user, loading }  = useAuth();

  if(user && !loading) return (
    <div className="flex flex-col h-dvh w-full overflow-hidden items-center justify-center gap-8 p-8">
      <p className="text-center text-3xl font-bold">You are already signed in as {user.email}.</p>
      <div className="flex flex-col md:flex-row gap-4">
      <GlobalLink href="/dashboard" title="Proceed to dashboard" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />
      <SignOut/>
      </div>
    </div>
  )
  
  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden items-center justify-center gap-8 p-8">
      <p className="text-center text-3xl font-bold">You won't be able to access the dashboard if you don't have an account with us. Please contact us to create an account. If you already have an account with us, you may proceed to login via your registered email and access the dashboard.</p>
      <div className="flex gap-4 flex-col md:flex-row">
      <GlobalLink href="/contact" title="Contact us" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />
      <SignInWithGoogle/>
      </div>
    </div>
  );
}

export default LoginPage;