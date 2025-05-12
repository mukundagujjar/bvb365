import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { adminAuth, adminFirestore } from "@/firebase/firebaseAdmin"
import SignOut from "@/components/SignOut"
import DashboardClientContent from "@/components/DashboardClientContent"

// Helper function to get authenticated user and data
async function getAuthenticatedUserAndData() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("__session")?.value

  if (!sessionCookie) {
    console.log("Dashboard: No session cookie found. Redirecting.")
    return { error: "unauthenticated", data: null }
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    const uid = decodedClaims.uid
    const userDocRef = adminFirestore.collection("users").doc(uid)
    const userDocSnap = await userDocRef.get()

    if (!userDocSnap.exists) {
      console.warn(`Dashboard: User document not found for UID: ${uid}. Claims from token:`, decodedClaims)
      return {
        error: "user_not_found",
        data: { uid, email: decodedClaims.email, name: decodedClaims.name || "User (from token)" },
      }
    }

    const userDataFromDb = userDocSnap.data()
    // console.log(userDataFromDb)
    let formattedCreatedAt = "N/A"

    if (userDataFromDb.createdAt && typeof userDataFromDb.createdAt.toDate === "function") {
      try {
        formattedCreatedAt = new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "Asia/Kolkata",
        }).format(userDataFromDb.createdAt.toDate())
      } catch (e) {
        console.error("Error formatting date:", e)
        formattedCreatedAt = userDataFromDb.createdAt.toDate().toISOString()
      }
    }

    const rawProfitsData =
      typeof userDataFromDb.profits === "object" &&
      userDataFromDb.profits !== null &&
      !Array.isArray(userDataFromDb.profits)
        ? userDataFromDb.profits
        : {}

    const allProfitEntriesFlat = []
    const monthlyProfitTotals = {}
    let cumulativeTotalProfit = 0
    let lastOverallProfitEntry = null

    const sortedMonthKeys = Object.keys(rawProfitsData)
      .filter((monthKey) => typeof monthKey === "string")
      .sort((a, b) => {
        try {
          return new Date(`01 ${a}`) - new Date(`01 ${b}`)
        } catch (e) {
          console.error(`Error parsing month keys for sorting: ${a}, ${b}`, e)
          return 0
        }
      })

    for (const monthKey of sortedMonthKeys) {
      const monthProfitArray = rawProfitsData[monthKey]
      if (Array.isArray(monthProfitArray)) {
        const validMonthProfits = monthProfitArray.map((p) => Number(p)).filter((p) => !isNaN(p))
        allProfitEntriesFlat.push(...validMonthProfits)
        const monthSum = validMonthProfits.reduce((sum, currentProfit) => sum + currentProfit, 0)
        monthlyProfitTotals[monthKey] = monthSum
        cumulativeTotalProfit += monthSum
      } else {
        console.warn(
          `Dashboard: Profits data for month '${monthKey}' for user ${uid} is not an array or invalid. Value:`,
          monthProfitArray,
        )
      }
    }

    if (sortedMonthKeys.length > 0) {
      for (let i = sortedMonthKeys.length - 1; i >= 0; i--) {
        const latestMonthKey = sortedMonthKeys[i]
        const latestMonthProfitArray = rawProfitsData[latestMonthKey]
        if (Array.isArray(latestMonthProfitArray)) {
          const validLatestMonthProfits = latestMonthProfitArray.map((p) => Number(p)).filter((p) => !isNaN(p))
          if (validLatestMonthProfits.length > 0) {
            lastOverallProfitEntry = validLatestMonthProfits[validLatestMonthProfits.length - 1]
            break
          }
        }
      }
    }

    const returnData = {
      uid,
      email: decodedClaims.email,
      name: userDataFromDb.name || decodedClaims.name || "Valued User",
      invtestedAmount: userDataFromDb.invtestedAmount !== undefined ? Number(userDataFromDb.invtestedAmount) : 0,
      totalProfit: cumulativeTotalProfit,
      profitHistory: allProfitEntriesFlat,
      rawProfitsData: rawProfitsData,
      monthlyProfitTotals: monthlyProfitTotals,
      lastOverallProfitEntry: lastOverallProfitEntry,
      activeSubscription: userDataFromDb.activeSubscription || false,
      createdAt: formattedCreatedAt,
    }

    return { error: null, data: returnData }
  } catch (error) {
    console.error("Dashboard: Authentication or data fetching error:", error.message, error.code, error)
    if (error.code === "auth/session-cookie-expired" || error.code === "auth/session-cookie-revoked") {
      return { error: "session_invalid", data: null }
    }
    return { error: "authentication_failed", data: null }
  }
}

// Dashboard Page Component
const DashboardPage = async () => {
  const authResult = await getAuthenticatedUserAndData()

  if (authResult.error || !authResult.data) {
    console.log(`DashboardPage: Redirecting. Error: ${authResult.error}, Data: ${!authResult.data ? "null" : "exists"}`)
    redirect("/login")
  }

  const userData = authResult.data

  return (
    <div className="flex flex-col min-h-screen w-full p-4 bg-background overflow-y-auto">
      {/* <header className="flex w-full justify-between flex-wrap gap-4 items-center mb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-foreground">Welcome, {userData.name || "User"}!</h1>
          <p className="text-foreground/60 mt-1">Track your investment performance and profits</p>
        </div>
        <SignOut />
      </header> */}

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
              <p className="text-foreground font-medium">{userData.createdAt}</p>
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
