"use client"

import SignInWithGoogle from "@/components/SignInWithGoogle"
import { useAuth } from "@/app/context/AuthContext"
import GlobalLink from "@/components/GlobalLink"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const { user, loading, authChecked } = useAuth()
  const [toast, setToast] = useState({ visible: false, message: "", type: "error" })
  const router = useRouter()

  useEffect(() => {
    // Redirect with a tiny delay to show feedback
    if (user && authChecked && !loading) {
      const timeout = setTimeout(() => {
        router.push("/dashboard")
      }, 1000) // Optional: 1s delay for visual feedback

      return () => clearTimeout(timeout)
    }
  }, [user, authChecked, loading, router])

  if (loading || !authChecked) {
    return (
      <div className="flex flex-col h-dvh w-full overflow-hidden items-center justify-center gap-4 p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
        <p className="text-center text-lg">Checking authentication...</p>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex flex-col h-dvh w-full overflow-hidden items-center justify-center gap-4 p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="text-center text-lg text-green-600">Redirecting to dashboard...</p>
        <p className="text-center text-sm text-foreground/60">Welcome back, {user?.email}</p>
        <div className="mt-4">
          <GlobalLink
            href="/dashboard"
            title="Continue to Dashboard"
            additionalClasses="bg-foreground text-background hover:bg-foreground/90 text-sm px-4 py-2"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden items-center justify-center gap-8 p-8 relative">
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-[var(--radius)] shadow-lg max-w-xs z-50 ${
            toast.type === "error"
              ? "bg-destructive text-destructive-foreground"
              : toast.type === "success"
              ? "bg-accent text-accent-foreground"
              : "bg-primary text-primary-foreground"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}

      <p className="text-center text-3xl font-bold max-w-4xl">
        You won't be able to access the dashboard if you don't have an account with us. Please contact us to create an
        account. If you already have an account with us, you may proceed to login via your registered email and access
        the dashboard.
      </p>
      <div className="flex gap-4 flex-col md:flex-row">
        <GlobalLink
          href="/contact"
          title="Contact us"
          additionalClasses="bg-foreground text-background hover:bg-foreground/90"
        />
        <SignInWithGoogle onError={setToast} />
      </div>
    </div>
  )
}

export default LoginPage
