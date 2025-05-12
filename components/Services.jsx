"use client"
import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, LineChart, IndianRupee } from "lucide-react"
import GlobalLink from "@/components/GlobalLink"
// Removed Shadcn UI imports

// const Services = () => { // Original
export default function Services() { // Changed to a named export, common practice
    // Removed unused useState for hover and hover2

    return (
        <div className="flex flex-col w-full justify-center"> {/* Added some padding y for overall section */}
            <div className="flex flex-col w-full px-4 lg:w-3/4 mx-auto gap-8 items-center justify-center">
                <h2 className="text-4xl font-bold text-center">Services we offer</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"> {/* Added w-full for grid container */}
                    {/* Trading Education Card */}
                    <div className={`flex flex-col h-full select-none cursor-pointer outline-purple-500 outline-2 outline-offset-4 p-6 rounded-lg shadow-lg`}> {/* Replaced Card */}
                        {/* CardHeader equivalent */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <LineChart className="h-6 w-6 text-purple-600 dark:text-purple-400" /> {/* Assuming text-primary was purple-ish */}
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Trading Education</h3> {/* Replaced CardTitle */}
                            </div>
                            <p className="text-base text-gray-600 dark:text-gray-300"> {/* Replaced CardDescription */}
                                Learn profitable trading strategies directly from our expert traders
                            </p>
                        </div>

                        {/* CardContent equivalent */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                <div className={`rounded-lg p-4 bg-purple-100 dark:bg-purple-500/30`}> {/* Adjusted background for better contrast/theme */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Live Trading</h4>
                                    </div>
                                    <p className="text-sm md:text-md text-gray-500 dark:text-gray-400">
                                        Join our live Google Meet sessions where you can watch our trading process in real-time and receive actionable trading opportunities.
                                    </p>
                                    {/* Separator equivalent */}
                                    <div className="border-t border-purple-300 dark:border-purple-500/50 my-2"></div>
                                    <p className="text-md md:text-lg mt-2 font-bold text-purple-600 dark:text-purple-400">
                                        <IndianRupee className="h-4 w-4 inline-block" /> 5,000/month
                                    </p>
                                </div>
                                <div className={`rounded-lg p-4 bg-purple-100 dark:bg-purple-500/30`}> {/* Adjusted background for better contrast/theme */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Coaching</h4>
                                    </div>
                                    <p className="text-sm md:text-md text-gray-500 dark:text-gray-400">
                                        Complete trading education with 3 months of FREE live sessions included. Learn our proven strategies that consistently deliver exceptional returns.
                                    </p>
                                    {/* Separator equivalent */}
                                    <div className="border-t border-purple-300 dark:border-purple-500/50 my-2"></div>
                                    <p className="text-md md:text-lg mt-2 font-bold text-purple-600 dark:text-purple-400">
                                        <IndianRupee className="h-4 w-4 inline-block" /> 25,000 (one-time)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investments Card */}
                    <div className={`flex flex-col h-full select-none cursor-pointer outline-blue-500 outline-2 outline-offset-4 p-6 rounded-lg shadow-lg`}> {/* Replaced Card */}
                        {/* CardHeader equivalent */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-400" /> {/* Assuming text-primary was blue-ish */}
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Investment Management</h3> {/* Replaced CardTitle */}
                            </div>
                            <p className="text-base text-gray-600 dark:text-gray-300"> {/* Replaced CardDescription */}
                                Let our experts grow your wealth with our guaranteed minimum 8% monthly returns
                            </p>
                        </div>

                        {/* CardContent equivalent */}
                        <div className="flex-1">
                            <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-4">
                                We allocate 20% of your investment for active trading while keeping 80% secure. Our investment approach guarantees you'll always maintain at least 80% of your initial capital while earning a minimum of 8% profit monthly on your total investment.
                            </p>
                            <ul className="space-y-2 mb-4 text-sm md:text-md text-gray-700 dark:text-gray-300"> {/* Added space-y-2 for list items */}
                                <li className="flex items-start gap-2">
                                    <div className="rounded-full bg-blue-100 dark:bg-blue-500/30 p-1 mt-0.5">
                                        <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span>Guaranteed minimum 8% monthly returns on total investment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="rounded-full bg-blue-100 dark:bg-blue-500/30 p-1 mt-0.5">
                                        <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span>We only take 5% of profits generated - not your principal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="rounded-full bg-blue-100 dark:bg-blue-500/30 p-1 mt-0.5">
                                        <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span>80% of your investment always kept secure</span>
                                </li>
                            </ul>
                        </div>

                        {/* CardFooter equivalent */}
                        <div className="mt-auto pt-4"> {/* Added mt-auto to push to bottom and pt-4 for spacing */}
                            <div className={`p-3 rounded-lg w-full bg-blue-100 dark:bg-blue-500/30`}> {/* Adjusted background */}
                                <p className="text-md md:text-lg font-bold text-center text-gray-800 dark:text-gray-100">
                                    Minimum Investment:{" "}
                                    <span className="text-md md:text-lg text-blue-600 dark:text-blue-400">
                                        <IndianRupee className="h-4 w-4 inline-block" /> 1,00,000
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Replaced Button with Link styled as a button */}
                <GlobalLink href="/contact" title="Contact us" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />
            </div>
        </div>
    )
}

// export default Services; // Original export