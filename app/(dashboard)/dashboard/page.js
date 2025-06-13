import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { adminAuth, adminFirestore } from "@/firebase/firebaseAdmin"
import DashboardClientContent from "@/components/DashboardClientContent"

async function getBasicUserAuth() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("__session")?.value

  if (!sessionCookie) {
    return { error: "unauthenticated", data: null }
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    const uid = decodedClaims.uid

    const userDocRef = adminFirestore.collection("users").doc(uid)
    const userDocSnap = await userDocRef.get()

    if (!userDocSnap.exists) {
      return {
        error: "user_not_found",
        data: { uid, email: decodedClaims.email, name: decodedClaims.name || "User" },
      }
    }

    const userDataFromDb = userDocSnap.data()

    return {
      error: null,
      data: {
        uid,
        email: decodedClaims.email,
        name: userDataFromDb.name || decodedClaims.name || "Valued User",
        invtestedAmount: userDataFromDb.invtestedAmount || 0,
        activeSubscription: userDataFromDb.activeSubscription || false,
        createdAt: userDataFromDb.createdAt ? userDataFromDb.createdAt.toDate() : null,
      }
    }
  } catch (error) {
    console.error("Dashboard auth error:", error)
    return { error: "authentication_failed", data: null }
  }
}

const DashboardPage = async () => {
  const authResult = await getBasicUserAuth()

  if (authResult.error || !authResult.data) {
    redirect("/login")
  }

  const userData = authResult.data

  return (
    <div className="flex flex-col min-h-screen w-full p-4 bg-background overflow-y-auto">
      <main className="flex-1 w-full max-w-8xl mx-auto py-1">
        <DashboardClientContent userData={userData} />
        <div className="mt-10 pt-6 border-t border-foreground/10">
          <div className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/70"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h3 className="text-xl font-bold text-foreground">Account Summary</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
              <p className="text-foreground/60 mb-1">Email</p>
              <p className="text-foreground font-medium">{userData.email}</p>
            </div>

            {userData.invtestedAmount > 0 && (
              <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                <p className="text-foreground/60 mb-1">Initial Investment</p>
                <p className="text-foreground font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(userData.invtestedAmount)}
                </p>
              </div>
            )}

            <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
              <p className="text-foreground/60 mb-1">Subscription Status</p>
              <div className="flex items-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${userData.activeSubscription ? "bg-green-500" : "bg-red-500"}`}
                ></span>
                <p className="text-foreground font-medium">{userData.activeSubscription ? "Active" : "Inactive"}</p>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
              <p className="text-foreground/60 mb-1">Member Since</p>
              <p className="text-foreground font-medium">
                {userData.createdAt ? new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Kolkata",
                }).format(userData.createdAt) : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-foreground/40 text-sm py-4">
        <p>© {new Date().getFullYear()} Investment Dashboard. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default DashboardPage
