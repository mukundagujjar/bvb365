// app/(protected)/dashboard/page.js

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin';
import SignOut from "@/components/SignOut";
// import PageTitle from "@/components/PageTitle";

// Import the chart component (path updated as per your last snippet)
import ProfitTrendChart from '@/components/ProfitTrendChart';

// --- Helper function to get authenticated user and data (remains the same) ---
async function getAuthenticatedUserAndData() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
        console.log("Dashboard: No session cookie found. Redirecting.");
        return { error: 'unauthenticated', data: null };
    }

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decodedClaims.uid;
        const userDocRef = adminFirestore.collection('users').doc(uid);
        const userDocSnap = await userDocRef.get();

        if (!userDocSnap.exists) {
            console.warn(`Dashboard: User document not found for UID: ${uid}. Claims from token:`, decodedClaims);
            return { error: 'user_not_found', data: { uid, email: decodedClaims.email, name: decodedClaims.name || 'User (from token)' } };
        }

        const userDataFromDb = userDocSnap.data();
        let formattedCreatedAt = 'N/A';

        if (userDataFromDb.createdAt && typeof userDataFromDb.createdAt.toDate === 'function') {
            try {
                formattedCreatedAt = new Intl.DateTimeFormat('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    timeZone: 'Asia/Kolkata'
                }).format(userDataFromDb.createdAt.toDate());
            } catch (e) {
                console.error("Error formatting date:", e);
                formattedCreatedAt = userDataFromDb.createdAt.toDate().toISOString();
            }
        }

        let profitHistory = [];
        let totalProfit = 0;

        if (Array.isArray(userDataFromDb.profit)) {
            profitHistory = userDataFromDb.profit.map(p => Number(p)).filter(p => !isNaN(p));
            totalProfit = profitHistory.reduce((sum, currentProfit) => sum + currentProfit, 0);
        } else if (userDataFromDb.profit !== undefined && !isNaN(Number(userDataFromDb.profit))) {
            const singleProfit = Number(userDataFromDb.profit);
            profitHistory = [singleProfit];
            totalProfit = singleProfit;
            console.warn(`Dashboard: User ${uid} has 'profit' as a single value. Expected an array. Using this value.`);
        } else {
            console.warn(`Dashboard: User ${uid} has no valid 'profit' data or it's not an array. Defaulting to empty/zero.`);
        }

        const returnData = {
            uid,
            email: decodedClaims.email,
            name: userDataFromDb.name || decodedClaims.name || 'Valued User',
            invtestedAmount: userDataFromDb.invtestedAmount !== undefined ? Number(userDataFromDb.invtestedAmount) : 0,
            totalProfit: totalProfit,
            profitHistory: profitHistory, // Ensure profitHistory is passed
            activeSubscription: userDataFromDb.activeSubscription || false,
            createdAt: formattedCreatedAt,
        };

        // console.log("Dashboard: Successfully fetched user data:", returnData);
        return { error: null, data: returnData };

    } catch (error) {
        // console.error("Dashboard: Authentication or data fetching error:", error.message, error.code);
        if (error.code === 'auth/session-cookie-expired' || error.code === 'auth/session-cookie-revoked') {
            return { error: 'session_invalid', data: null };
        }
        return { error: 'authentication_failed', data: null };
    }
}

// --- InvestmentStatus Component (Modified for four boxes) ---
const InvestmentStatus = ({ invtestedAmount, totalProfit, profitHistory }) => {
    const originalInvestment = invtestedAmount || 0;
    const currentTotalProfit = totalProfit || 0; // Renamed to avoid conflict in scope
    const currentPortfolioValue = originalInvestment + currentTotalProfit;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const TrendUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
    const TrendDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>;
    const NeutralIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M5 12h14"/></svg>;

    // Box 1: Total Investment (Current Portfolio Value)
    let portfolioPercentageChange = 0;
    let portfolioPercentageChangeText = "0.00%";
    let portfolioPercentageColorClass = "text-background/60";

    if (originalInvestment !== 0) {
        portfolioPercentageChange = (currentTotalProfit / originalInvestment) * 100;
        portfolioPercentageChangeText = `${portfolioPercentageChange.toFixed(2)}%`;
        if (portfolioPercentageChange > 0) portfolioPercentageColorClass = "text-green-400";
        else if (portfolioPercentageChange < 0) portfolioPercentageColorClass = "text-red-400";
    } else if (currentTotalProfit !== 0) {
        portfolioPercentageChangeText = currentTotalProfit > 0 ? "+∞%" : "-∞%";
        portfolioPercentageColorClass = currentTotalProfit > 0 ? "text-green-400" : "text-red-400";
    } else { // Both 0
         portfolioPercentageChangeText = "N/A";
    }


    // Box 3: Total Profit
    let totalProfitColorClass = "text-background/60";
    if (currentTotalProfit > 0) totalProfitColorClass = "text-green-400";
    else if (currentTotalProfit < 0) totalProfitColorClass = "text-red-400";

    // Box 4: Last Profit
    const lastProfitEntry = Array.isArray(profitHistory) && profitHistory.length > 0
        ? profitHistory[profitHistory.length - 1]
        : null; // Keep as null or undefined to check later

    let lastProfitColorClass = "text-background/60";
    let lastProfitValueText = "N/A";
    let LastProfitIcon = NeutralIcon;

    if (lastProfitEntry !== null && !isNaN(lastProfitEntry)) {
        lastProfitValueText = formatCurrency(lastProfitEntry);
         if (lastProfitEntry > 0) {
            lastProfitColorClass = "text-green-400";
            LastProfitIcon = TrendUpIcon;
            lastProfitValueText = `+${lastProfitValueText}`;
        } else if (lastProfitEntry < 0) {
            lastProfitColorClass = "text-red-400";
            LastProfitIcon = TrendDownIcon;
        }
        // If lastProfitEntry is 0, it uses NeutralIcon and default color, text is formatted currency(0)
    } else {
        // lastProfitEntry is null or NaN
        lastProfitColorClass = "text-background/70"; // More subdued for N/A
    }


    return (
        <>
            {/* Box 1: Total Investment (Current Portfolio Value) */}
            <div className="flex flex-col bg-foreground rounded-lg p-4 text-background gap-1 shadow-md">
                <h3 className="text-md font-semibold text-background/80">Total Investment</h3>
                <p className="text-xl font-bold text-background/90">
                    {formatCurrency(currentPortfolioValue)}
                </p>
                <div className={`flex items-center text-xs font-medium ${portfolioPercentageColorClass}`}>
                    {portfolioPercentageChange > 0 && <TrendUpIcon />}
                    {portfolioPercentageChange < 0 && <TrendDownIcon />}
                    {portfolioPercentageChange === 0 && originalInvestment !== 0 && <NeutralIcon />}
                    {portfolioPercentageChange === 0 && originalInvestment === 0 && currentTotalProfit !==0 && (currentTotalProfit > 0 ? <TrendUpIcon/> : <TrendDownIcon/>) }
                    {portfolioPercentageChange === 0 && originalInvestment === 0 && currentTotalProfit === 0 && <NeutralIcon/>}
                    <span>{portfolioPercentageChangeText}</span>
                </div>
            </div>

            {/* Box 2: Original Investment */}
            <div className="flex flex-col bg-foreground rounded-lg p-4 text-background gap-1 shadow-md">
                <h3 className="text-md font-semibold text-background/80">Original Investment</h3>
                <p className="text-xl font-bold text-background/90">
                    {formatCurrency(originalInvestment)}
                </p>
                <div className="text-xs text-background/60 invisible">Placeholder</div> {/* For alignment */}
            </div>

            {/* Box 3: Total Profit */}
            <div className="flex flex-col bg-foreground rounded-lg p-4 text-background gap-1 shadow-md">
                <h3 className="text-md font-semibold text-background/80">Total Profit</h3>
                <p className={`text-xl font-bold ${totalProfitColorClass}`}>
                    {currentTotalProfit >= 0 ? '+' : ''}{formatCurrency(currentTotalProfit)}
                </p>
                <div className={`flex items-center text-xs font-medium ${totalProfitColorClass}`}>
                    {currentTotalProfit > 0 && <TrendUpIcon />}
                    {currentTotalProfit < 0 && <TrendDownIcon />}
                    {currentTotalProfit === 0 && <NeutralIcon />}
                    <span>
                        {currentTotalProfit > 0 ? 'Net Gain' : currentTotalProfit < 0 ? 'Net Loss' : 'No Change'}
                    </span>
                </div>
            </div>

            {/* Box 4: Last Profit */}
            <div className="flex flex-col bg-foreground rounded-lg p-4 text-background gap-1 shadow-md">
                <h3 className="text-md font-semibold text-background/80">Last Profit Entry</h3>
                <p className={`text-xl font-bold ${lastProfitColorClass}`}>
                    {lastProfitValueText}
                </p>
                <div className={`flex items-center text-xs font-medium ${lastProfitColorClass}`}>
                   <LastProfitIcon />
                    <span>
                        {lastProfitEntry === null || isNaN(lastProfitEntry) ? 'No Data' : (lastProfitEntry > 0 ? 'Gain' : lastProfitEntry < 0 ? 'Loss' : 'No Change')}
                    </span>
                </div>
            </div>
        </>
    );
};

// --- Dashboard Page Component ---
const DashboardPage = async () => {
    const authResult = await getAuthenticatedUserAndData();

    if (authResult.error || !authResult.data) {
        console.log(`DashboardPage: Redirecting. Error: ${authResult.error}, Data: ${JSON.stringify(authResult.data)}`);
        redirect('/login');
    }

    const userData = authResult.data;

    return (
        <div className="flex flex-col h-full w-full gap-4 md:gap-6 p-4">
            <div className="flex w-full justify-between flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-foreground">Welcome, {userData.name}!</h1>
            <SignOut />
            </div>
            <div className="flex flex-col overflow-auto h-full w-full pr-4 gap-6">
                <h2 className="text-2xl font-semibold text-foreground">Investment Overview</h2>
                {/* Grid layout remains md:grid-cols-2, which will make 4 items 2x2 */}
                <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 mb-8">
                    <InvestmentStatus
                        invtestedAmount={userData.invtestedAmount}
                        totalProfit={userData.totalProfit}
                        profitHistory={userData.profitHistory} // Pass profitHistory here
                    />
                </div>

                <h2 className="text-2xl font-semibold text-foreground">Profit Trend</h2>
                {/* --- Profit Trend Chart Section --- */}
                {userData.profitHistory && userData.profitHistory.length > 0 && (
                    <div className="mb-8">
                        <ProfitTrendChart profitHistory={userData.profitHistory} />
                    </div>
                )}
                {/* --- End Profit Trend Chart Section --- */}

                <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Account Summary</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Subscription Active:</strong> {userData.activeSubscription ? 'Yes' : 'No'}</p>
                        <p><strong>Member Since:</strong> {userData.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;