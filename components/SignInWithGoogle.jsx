"use client"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"
import { useState } from "react"
import { Loader } from "lucide-react"

const provider = new GoogleAuthProvider()

const SignInWithGoogle = ({ onError }) => {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)

    try {
      // Step 1: Sign in with Google (client-side)
      const result = await signInWithPopup(auth, provider)

      // Step 2: Get ID Token and send to API route for verification
      const displayName = result.user.displayName
      const idToken = await auth.currentUser?.getIdToken()

      if (!idToken) {
        throw new Error("Failed to get ID token after sign-in.")
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken, displayName }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle errors from the API route
        // console.error("API Login Error:", data.error)
        await auth.signOut() // Sign out unauthorized user

        // Show specific error messages using toast
        if (response.status === 403) {
          onError("Access denied: Your email is not authorized. Please contact support.")
        } else {
          onError(data.error || "Login failed. Please try again.")
        }
      } else {
        // Success - AuthContext will handle the redirect automatically
        // console.log("Authentication successful:", data)
        // Don't manually redirect here - let AuthContext handle it
      }
    } catch (error) {
      // console.error("Sign-in process error:", error)

      // Handle specific error types with toast
      if (error.code === "auth/popup-closed-by-user") {
        onError("Sign-in cancelled.")
      } else if (error.code === "auth/popup-blocked") {
        onError("Popup blocked. Please allow popups and try again.")
      } else {
        onError(`Sign-in failed: ${error.message}`)
      }

      // Ensure user is signed out on client-side errors
      await signOut(auth)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleSignIn}
        className="flex items-center justify-center gap-3 px-4 py-2 md:px-8 md:py-4 cursor-pointer bg-muted text-muted-foreground rounded-lg transition-colors ease-in-out duration-200 font-semibold min-w-[200px] md:min-w-[260px] min-h-[40px] md:min-h-[60px] md:text-2xl relative hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        <span
          className={`flex items-center gap-3 transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="display:block"
            width="20"
            height="20"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          Sign in with Google
        </span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin" />
          </div>
        )}
      </button>
    </div>
  )
}

export default SignInWithGoogle