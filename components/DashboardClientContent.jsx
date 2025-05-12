"use client"

import { useState, useMemo, useEffect } from "react"
import InvestmentStatus from "@/components/InvestmentStatus"
import ProfitTrendChart from "@/components/ProfitTrendChart"
import SignOut from "./SignOut"

const DashboardClientContent = ({ userData }) => {
    const [selectedView, setSelectedView] = useState("cumulative")
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Add animation effect when component mounts
        setIsLoaded(true)
    }, [])

    const monthKeys = useMemo(() => {
        if (!userData.rawProfitsData || typeof userData.rawProfitsData !== "object") {
            return []
        }
        return Object.keys(userData.rawProfitsData)
            .filter((monthKey) => typeof monthKey === "string")
            .sort((a, b) => {
                try {
                    return new Date(`01 ${a}`) - new Date(`01 ${b}`)
                } catch (e) {
                    console.warn(`Error parsing month keys for dropdown sorting: ${a}, ${b}`, e)
                    return 0
                }
            })
    }, [userData.rawProfitsData])

    const handleViewChange = (event) => {
        setSelectedView(event.target.value)
    }

    const displayData = useMemo(() => {
        if (
            selectedView === "cumulative" ||
            !userData.rawProfitsData[selectedView] ||
            userData.monthlyProfitTotals[selectedView] === undefined
        ) {
            return {
                periodSpecificTotalProfit: userData.totalProfit,
                periodSpecificProfitHistory: userData.profitHistory,
                chartData: userData.profitHistory,
                chartTitleSuffix: "(Cumulative)",
            }
        } else {
            const monthProfitEntries = (userData.rawProfitsData[selectedView] || []).map(Number).filter((p) => !isNaN(p))
            const monthTotalProfit = userData.monthlyProfitTotals[selectedView]

            return {
                periodSpecificTotalProfit: monthTotalProfit,
                periodSpecificProfitHistory: monthProfitEntries,
                chartData: monthProfitEntries,
                chartTitleSuffix: `(${selectedView})`,
            }
        }
    }, [selectedView, userData])

    const investmentStatusProps = {
        invtestedAmount: userData.invtestedAmount,
        cumulativeTotalProfitForPortfolio: userData.totalProfit,
        periodTotalProfit: displayData.periodSpecificTotalProfit,
        periodProfitHistory: displayData.periodSpecificProfitHistory,
    }

    return (
        <div className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">Welcome, {userData.name || "User"}!</h2>
                <div className="flex gap-4">
                    <div className="relative flex-grow sm:max-w-xs">
                        <select
                            value={selectedView}
                            onChange={handleViewChange}
                            className="w-full p-2.5 pl-4 pr-10 border border-background/10 rounded-lg bg-background text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                        >
                            <option value="cumulative">Cumulative View</option>
                            {monthKeys.map((monthKey) => (
                                <option key={monthKey} value={monthKey}>
                                    {monthKey}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-foreground/70"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <SignOut/>
                </div>
            </div>

            <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                <InvestmentStatus {...investmentStatusProps} />
            </div>

            <div className="mb-10 bg-foreground/5 p-6 rounded-xl border border-foreground/10">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    Profit Trend {displayData.chartTitleSuffix}
                </h2>
                {displayData.chartData && displayData.chartData.length > 0 ? (
                    <div className="transition-all duration-300 ease-in-out">
                        <ProfitTrendChart profitHistory={displayData.chartData} />
                    </div>
                ) : (
                    <div className="bg-foreground/10 rounded-lg p-8 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mx-auto mb-4 text-foreground/40"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-foreground/60 text-lg">No profit data available for this view.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardClientContent
