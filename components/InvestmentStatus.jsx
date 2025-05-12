// Helper Icons
const TrendUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-1"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)
const TrendDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-1"
  >
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
)
const NeutralIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-1"
  >
    <path d="M5 12h14" />
  </svg>
)

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const InvestmentStatus = ({
  invtestedAmount,
  cumulativeTotalProfitForPortfolio,
  periodTotalProfit,
  periodProfitHistory,
}) => {
  const originalInvestment = invtestedAmount || 0
  const currentPortfolioValue = originalInvestment + (cumulativeTotalProfitForPortfolio || 0)
  const netCumulativeProfit = cumulativeTotalProfitForPortfolio || 0

  // Box 1: Total Investment (Current Portfolio Value)
  let portfolioPercentageChange = 0
  let portfolioPercentageChangeText = "0.00%"
  let portfolioPercentageColorClass = "text-background/60"

  if (originalInvestment !== 0) {
    portfolioPercentageChange = (netCumulativeProfit / originalInvestment) * 100
    portfolioPercentageChangeText = `${portfolioPercentageChange.toFixed(2)}%`
    if (portfolioPercentageChange > 0) portfolioPercentageColorClass = "text-green-400"
    else if (portfolioPercentageChange < 0) portfolioPercentageColorClass = "text-red-400"
  } else if (netCumulativeProfit !== 0) {
    portfolioPercentageChangeText = netCumulativeProfit > 0 ? "+∞%" : "-∞%"
    portfolioPercentageColorClass = netCumulativeProfit > 0 ? "text-green-400" : "text-red-400"
  } else {
    portfolioPercentageChangeText = "N/A"
  }

  // Box 3: Total Profit (For Selected Period)
  const currentPeriodTotalProfit = periodTotalProfit || 0
  let periodProfitColorClass = "text-background/60"
  if (currentPeriodTotalProfit > 0) periodProfitColorClass = "text-green-400"
  else if (currentPeriodTotalProfit < 0) periodProfitColorClass = "text-red-400"

  // Box 4: Last Profit (From Selected Period's History)
  const lastProfitEntryFromPeriod =
    Array.isArray(periodProfitHistory) && periodProfitHistory.length > 0
      ? periodProfitHistory[periodProfitHistory.length - 1]
      : null

  let lastProfitColorClass = "text-background/60"
  let lastProfitValueText = "N/A"
  let LastProfitIconComponent = NeutralIcon

  if (lastProfitEntryFromPeriod !== null && !isNaN(lastProfitEntryFromPeriod)) {
    lastProfitValueText = formatCurrency(lastProfitEntryFromPeriod)
    if (lastProfitEntryFromPeriod > 0) {
      lastProfitColorClass = "text-green-400"
      LastProfitIconComponent = TrendUpIcon
      lastProfitValueText = `+${lastProfitValueText}`
    } else if (lastProfitEntryFromPeriod < 0) {
      lastProfitColorClass = "text-red-400"
      LastProfitIconComponent = TrendDownIcon
    }
  } else {
    lastProfitColorClass = "text-background/70"
  }

  return (
    <>
      {/* Box 1: Current Portfolio Value */}
      <div className="flex flex-col bg-foreground rounded-xl p-5 text-background gap-2 shadow-lg border border-background/5 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-background/70">Current Portfolio Value</h3>
          <div className="bg-background/10 rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
        <p className="text-2xl font-bold text-background">{formatCurrency(currentPortfolioValue)}</p>
        <div
          className={`flex items-center text-xs font-medium ${portfolioPercentageColorClass} mt-1 bg-background/5 rounded-full py-1 px-2 self-start`}
        >
          {(() => {
            if (portfolioPercentageChange > 0 || (originalInvestment === 0 && netCumulativeProfit > 0))
              return <TrendUpIcon />
            if (portfolioPercentageChange < 0 || (originalInvestment === 0 && netCumulativeProfit < 0))
              return <TrendDownIcon />
            return <NeutralIcon />
          })()}
          <span>
            {portfolioPercentageChangeText} <span className="text-background/50 text-[10px] ml-1">overall</span>
          </span>
        </div>
      </div>

      {/* Box 2: Original Investment */}
      <div className="flex flex-col bg-foreground rounded-xl p-5 text-background gap-2 shadow-lg border border-background/5 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-background/70">Original Investment</h3>
          <div className="bg-background/10 rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
        </div>
        <p className="text-2xl font-bold text-background">{formatCurrency(originalInvestment)}</p>
        <div className="text-xs text-background/60 mt-1 bg-background/5 rounded-full py-1 px-2 self-start opacity-0">
          Placeholder
        </div>
      </div>

      {/* Box 3: Period Profit/Loss */}
      <div className="flex flex-col bg-foreground rounded-xl p-5 text-background gap-2 shadow-lg border border-background/5 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-background/70">Period Profit/Loss</h3>
          <div className="bg-background/10 rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        </div>
        <p className={`text-2xl font-bold ${periodProfitColorClass}`}>
          {currentPeriodTotalProfit >= 0 ? "+" : ""}
          {formatCurrency(currentPeriodTotalProfit)}
        </p>
        <div
          className={`flex items-center text-xs font-medium ${periodProfitColorClass} mt-1 bg-background/5 rounded-full py-1 px-2 self-start`}
        >
          {currentPeriodTotalProfit > 0 && <TrendUpIcon />}
          {currentPeriodTotalProfit < 0 && <TrendDownIcon />}
          {currentPeriodTotalProfit === 0 && <NeutralIcon />}
          <span>
            {currentPeriodTotalProfit > 0 ? "Net Gain" : currentPeriodTotalProfit < 0 ? "Net Loss" : "No Change"}
            <span className="text-background/50 text-[10px] ml-1">this period</span>
          </span>
        </div>
      </div>

      {/* Box 4: Last Recorded Profit */}
      <div className="flex flex-col bg-foreground rounded-xl p-5 text-background gap-2 shadow-lg border border-background/5 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-background/70">Last Recorded Profit</h3>
          <div className="bg-background/10 rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
        <p className={`text-2xl font-bold ${lastProfitColorClass}`}>{lastProfitValueText}</p>
        <div
          className={`flex items-center text-xs font-medium ${lastProfitColorClass} mt-1 bg-background/5 rounded-full py-1 px-2 self-start`}
        >
          <LastProfitIconComponent />
          <span>
            {lastProfitEntryFromPeriod === null || isNaN(lastProfitEntryFromPeriod)
              ? "No Data"
              : lastProfitEntryFromPeriod > 0
                ? "Gain"
                : lastProfitEntryFromPeriod < 0
                  ? "Loss"
                  : "No Change"}
            <span className="text-background/50 text-[10px] ml-1">in period</span>
          </span>
        </div>
      </div>
    </>
  )
}

export default InvestmentStatus
