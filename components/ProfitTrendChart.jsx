"use client"

import { useState, useEffect, useMemo } from "react"; // Removed useRef, added useMemo
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import React from 'react'; // Import React for React.memo

// --- Define ALL colors statically outside the component ---
const STATIC_COLORS = {
    line: "oklch(0.6 0.118 184.704)",     // Cyan (user preference)
    grid: "rgba(226, 232, 240, 0.6)",     // Light grey grid
    axis: "#6b7280",                     // Medium grey axis text
    tooltipBg: "rgba(255, 255, 255, 0.95)", // Whiteish tooltip background
    tooltipBorder: "#e5e7eb",             // Light grey tooltip border
    tooltipText: "#1f2937",               // Dark grey/black tooltip text
    tooltipLabel: "#6366f1",             // Indigo tooltip label
    dotStroke: "rgba(0, 0, 0, 0.2)",      // Dark transparent dot stroke
    activeDotStroke: "#ffffff",           // White active dot stroke
    legendText: "#1f2937"                // Match tooltip text (or choose another static color)
};

// --- Define Intl.NumberFormat instance outside the component ---
// This avoids recreating it on every render, improving performance.
const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

// Helper function also outside component scope
const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '';
    return currencyFormatter.format(value);
};


// --- The Component ---
const ProfitTrendChart = ({ profitHistory }) => {
    // State only for animation control
    const [isAnimating, setIsAnimating] = useState(true);

    // --- Memoized Calculations ---
    // Recalculate only when profitHistory changes

    const chartData = useMemo(() => {
        if (!profitHistory) return [];
        return profitHistory.map((profit, index) => ({
            name: `Trade ${index + 1}`,
            profit: typeof profit === 'number' ? profit : 0, // Ensure profit is a number
        }));
    }, [profitHistory]);

    const yDomain = useMemo(() => {
        if (!profitHistory || profitHistory.length === 0) {
            return [0, 1]; // Default domain if no data
        }

        const profits = profitHistory.filter((p) => typeof p === 'number' && !isNaN(p));
        if (profits.length === 0) {
             return [0, 1]; // Default domain if no valid numbers
        }

        const minProfit = Math.min(...profits);
        const maxProfit = Math.max(...profits);

        // Handle case where min and max are the same
        if (minProfit === maxProfit) {
            return [minProfit - 1, maxProfit + 1]; // Give some space
        }

        const range = maxProfit - minProfit;

        // Add padding to the domain (ensure result is finite)
        const paddedMin = isFinite(minProfit - range * 0.1) ? minProfit - range * 0.1 : minProfit;
        const paddedMax = isFinite(maxProfit + range * 0.1) ? maxProfit + range * 0.1 : maxProfit;

        return [paddedMin, paddedMax];
    }, [profitHistory]);

    // --- Animation Reset Effect ---
    // This effect only runs when profitHistory changes, resetting the animation.
    // It's kept as it provides visual feedback with minimal performance overhead.
    useEffect(() => {
        setIsAnimating(true);
        // Short timeout to allow data to potentially update before starting animation visually
        const timer = setTimeout(() => setIsAnimating(false), 50); // Shorter delay might feel more responsive
        return () => clearTimeout(timer);
    }, [profitHistory]); // Dependency ensures it runs only when data changes


    // --- Render Logic ---

    // Loading/Empty State
    if (!chartData || chartData.length === 0) {
        return (
            <div className="bg-gray-100 rounded-lg p-6 text-gray-500 shadow-md h-64 flex items-center justify-center">
                 {/* Using static background/text colors */}
                <p className="text-gray-600 font-medium">No profit data available to display chart.</p>
            </div>
        );
    }

    return (
        // Using static background color (assuming 'bg-card' corresponds to white/light grey)
        <div className="bg-white rounded-lg p-4 shadow-md h-80 md:h-96 w-full">
            {/* Using static text color */}
            <h3 className="text-lg font-medium text-gray-800 mb-2 px-2">Profit Trend</h3>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={STATIC_COLORS.grid} />
                    <XAxis
                        dataKey="name"
                        stroke={STATIC_COLORS.axis}
                        tick={{ fill: STATIC_COLORS.axis, fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        stroke={STATIC_COLORS.axis}
                        tick={{ fill: STATIC_COLORS.axis, fontSize: 12 }}
                        tickFormatter={formatCurrency} // Use memoized formatter function
                        dx={-10}
                        domain={yDomain} // Use memoized domain
                        allowDataOverflow={true}
                    />
                    <Tooltip
                        formatter={(value) => [formatCurrency(value), "Profit"]} // Use memoized formatter function
                        contentStyle={{
                            backgroundColor: STATIC_COLORS.tooltipBg,
                            borderColor: STATIC_COLORS.tooltipBorder,
                            borderRadius: "0.5rem",
                            color: STATIC_COLORS.tooltipText,
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            padding: "10px 14px",
                        }}
                        labelStyle={{ color: STATIC_COLORS.tooltipLabel, fontWeight: "bold", marginBottom: "6px" }}
                        itemStyle={{ color: STATIC_COLORS.line, padding: "4px 0" }} // Use static line color for value
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: "15px" }}
                        // Use static color for legend text
                        formatter={(value) => <span style={{ color: STATIC_COLORS.legendText }} className="font-medium">{value}</span>}
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        name="Profit"
                        stroke={STATIC_COLORS.line}
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: STATIC_COLORS.line,
                            strokeWidth: 1,
                            stroke: STATIC_COLORS.dotStroke,
                        }}
                        activeDot={{
                            r: 8,
                            stroke: STATIC_COLORS.activeDotStroke,
                            strokeWidth: 2,
                            fill: STATIC_COLORS.line,
                        }}
                        isAnimationActive={isAnimating}
                        animationDuration={800} // Slightly faster animation might feel more performant
                        animationEasing="ease-in-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// Wrap export in React.memo for potential optimization
// This prevents re-rendering if parent component re-renders but `profitHistory` prop remains shallowly equal.
export default React.memo(ProfitTrendChart);