import { NextResponse } from 'next/server'
import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { cookies } from 'next/headers'

let profitsCache = {}
let lastFetchedTimestamps = {}
const CACHE_TTL = 60 * 1000 // 1 minute

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('__session')?.value

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    const uid = decodedClaims.uid

    // Serve from cache
    if (profitsCache[uid] && (Date.now() - lastFetchedTimestamps[uid] < CACHE_TTL)) {
      return NextResponse.json(profitsCache[uid])
    }

    const userDoc = await adminFirestore.collection('users').doc(uid).get()
    const userData = userDoc.data() || {}

    // Profits
    const rawProfitsData = typeof userData.profits === 'object' && userData.profits !== null && !Array.isArray(userData.profits)
      ? userData.profits : {}

    const allProfitEntriesFlat = []
    const monthlyProfitTotals = {}
    let cumulativeTotalProfit = 0
    let lastOverallProfitEntry = null

    const sortedMonthKeys = Object.keys(rawProfitsData)
      .filter(m => typeof m === 'string')
      .sort((a, b) => new Date(`01 ${a}`) - new Date(`01 ${b}`))

    for (const monthKey of sortedMonthKeys) {
      const profits = rawProfitsData[monthKey]
      if (Array.isArray(profits)) {
        const valid = profits.map(Number).filter(p => !isNaN(p))
        allProfitEntriesFlat.push(...valid)
        const monthSum = valid.reduce((a, b) => a + b, 0)
        monthlyProfitTotals[monthKey] = monthSum
        cumulativeTotalProfit += monthSum
      }
    }

    for (let i = sortedMonthKeys.length - 1; i >= 0; i--) {
      const arr = rawProfitsData[sortedMonthKeys[i]]
      if (Array.isArray(arr)) {
        const nums = arr.map(Number).filter(p => !isNaN(p))
        if (nums.length > 0) {
          lastOverallProfitEntry = nums[nums.length - 1]
          break
        }
      }
    }

    // Withdrawals
    const withdrawals = typeof userData.withdrawals === 'object' && userData.withdrawals !== null && !Array.isArray(userData.withdrawals)
      ? userData.withdrawals : {}

    const totalWithdrawn = Object.values(withdrawals)
      .map(Number)
      .filter(v => !isNaN(v))
      .reduce((a, b) => a + b, 0)

    const responseData = {
      rawProfitsData,
      monthlyProfitTotals,
      totalProfit: cumulativeTotalProfit,
      profitHistory: allProfitEntriesFlat,
      lastOverallProfitEntry,
      withdrawals,
      totalWithdrawn,
      portfolioValue: cumulativeTotalProfit - totalWithdrawn,
    }

    profitsCache[uid] = responseData
    lastFetchedTimestamps[uid] = Date.now()

    return NextResponse.json(responseData)
  } catch (err) {
    console.error('Error in /api/profits:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
