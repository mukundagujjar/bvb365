// app/(protected)/dashboard/ProfitTrendChart.js
'use client'; // Important: This makes it a Client Component

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitTrendChart = ({ profitHistory }) => {
    if (!profitHistory || profitHistory.length === 0) {
        return (
            <div className="bg-foreground rounded-lg p-4 text-background shadow-md h-64 flex items-center justify-center">
                <p className="text-background/70">No profit data available to display chart.</p>
            </div>
        );
    }

    // Prepare data for the chart
    // If your profit entries correspond to specific dates or labels,
    // you should include that data from Firestore and use it here for 'name'.
    const chartData = profitHistory.map((profit, index) => ({
        name: `Entry ${index + 1}`, // Placeholder name, replace if you have actual labels/dates
        profit: profit,
    }));

    // Currency formatter for Y-axis and Tooltip
    const formatCurrencyTooltip = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2, // Show paisa in tooltip if needed
        }).format(value);
    };

    return (
        <div className="bg-foreground rounded-lg p-4 pt-6 text-background shadow-md h-80 md:h-96">
            <h3 className="text-xl font-semibold mb-4 text-background/90">Profit Trend</h3>
            <ResponsiveContainer width="100%" height="90%"> {/* Adjust height to allow space for legend if it's below */}
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30, // Space for Y-axis labels if they are long
                        left: 20,  // Space for Y-axis labels
                        bottom: 20, // Space for X-axis labels and legend
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.2)" /> {/* Lighter grid for dark bg */}
                    <XAxis
                        dataKey="name"
                        stroke="#A0AEC0" // A light gray for text on dark background (Tailwind gray.400/500 equivalent)
                        tick={{ fill: '#CBD5E0', fontSize: 12 }} // Tailwind gray.300 equivalent
                        dy={10} // Offset X-axis labels down
                    />
                    <YAxis
                        stroke="#A0AEC0"
                        tick={{ fill: '#CBD5E0', fontSize: 12 }}
                        tickFormatter={formatCurrencyTooltip}
                        dx={-10} // Offset Y-axis labels left
                    />
                    <Tooltip
                        formatter={(value) => [formatCurrencyTooltip(value), "Profit"]}
                        contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.9)', // Darker, slightly transparent (e.g., slate.800)
                            borderColor: 'rgba(71, 85, 105, 0.9)',    // e.g., slate.600
                            borderRadius: '0.375rem', // rounded-md
                            color: '#E2E8F0' // e.g., slate.200 for text
                        }}
                        labelStyle={{ color: '#F8FAFC', fontWeight: 'bold' }} // e.g., slate.50
                        itemStyle={{ color: '#6EE7B7' }} // A bright color for the line item, e.g., emerald.300
                    />
                    <Legend
                        wrapperStyle={{ color: '#CBD5E0', paddingTop: '15px' }}
                        formatter={(value) => <span style={{ color: '#E2E8F0' }}>{value}</span>} // Ensure legend text is visible
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#34D399" // A vibrant green, e.g., Tailwind's green-400 or emerald-500
                        strokeWidth={2.5}
                        activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2, fill: '#34D399' }}
                        dot={{ r: 4, fill: '#34D399', strokeWidth: 1, stroke: 'rgba(20,20,20,0.5)' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfitTrendChart;