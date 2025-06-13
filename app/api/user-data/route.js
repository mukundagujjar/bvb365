import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('__session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;
    
    const userDocRef = adminFirestore.collection('users').doc(uid);
    const userDocSnap = await userDocRef.get();
    
    if (!userDocSnap.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userDataFromDb = userDocSnap.data();
    console.log('Fetched user data:', userDataFromDb);
    
    // Process complex profit calculations here
    // const rawProfitsData = typeof userDataFromDb.profits === 'object' && 
    //                       userDataFromDb.profits !== null && 
    //                       !Array.isArray(userDataFromDb.profits) 
    //                       ? userDataFromDb.profits : {};

    const rawProfitsData = userDataFromDb.profits;

    const allProfitEntriesFlat = [];
    const monthlyProfitTotals = {};
    let cumulativeTotalProfit = 0;
    let lastOverallProfitEntry = null;

    const sortedMonthKeys = Object.keys(rawProfitsData)
      .filter(monthKey => typeof monthKey === 'string')
      .sort((a, b) => {
        try {
          return new Date(`01 ${a}`) - new Date(`01 ${b}`);
        } catch (e) {
          return 0;
        }
      });

    for (const monthKey of sortedMonthKeys) {
      const monthProfitArray = rawProfitsData[monthKey];
      if (Array.isArray(monthProfitArray)) {
        const validMonthProfits = monthProfitArray.map(p => Number(p)).filter(p => !isNaN(p));
        allProfitEntriesFlat.push(...validMonthProfits);
        const monthSum = validMonthProfits.reduce((sum, currentProfit) => sum + currentProfit, 0);
        monthlyProfitTotals[monthKey] = monthSum;
        cumulativeTotalProfit += monthSum;
      }
    }

    // Find last profit entry
    if (sortedMonthKeys.length > 0) {
      for (let i = sortedMonthKeys.length - 1; i >= 0; i--) {
        const latestMonthKey = sortedMonthKeys[i];
        const latestMonthProfitArray = rawProfitsData[latestMonthKey];
        if (Array.isArray(latestMonthProfitArray)) {
          const validLatestMonthProfits = latestMonthProfitArray.map(p => Number(p)).filter(p => !isNaN(p));
          if (validLatestMonthProfits.length > 0) {
            lastOverallProfitEntry = validLatestMonthProfits[validLatestMonthProfits.length - 1];
            break;
          }
        }
      }
    }

    return NextResponse.json({
      totalProfit: cumulativeTotalProfit,
      profitHistory: allProfitEntriesFlat,
      rawProfitsData: rawProfitsData,
      monthlyProfitTotals: monthlyProfitTotals,
      lastOverallProfitEntry: lastOverallProfitEntry
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}