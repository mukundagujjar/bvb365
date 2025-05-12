"use client"
import { PhoneCall, IndianRupee, ChartCandlestick, LayoutDashboard } from 'lucide-react'
// Removed useState and useEffect as they are no longer used

// Data for the steps - remains the same
const steps = [
    {
        title: "Contact us",
        content: "We believe in complete transparency with our clients. During our initial discussion, you can ask any questions about our investment approach, risk management strategy, and guaranteed monthly returns. You may contact us via our contact page or WhatsApp us directly at +91-7709203276.",
        icon: PhoneCall
    },
    {
        title: "Make your investment",
        content: "After understanding our process, you can make a minimum investment of ₹1,00,000. We'll provide you with a payment link and contract. Once payment is received, we'll allocate 80% of your investment to secure holdings and use 20% as active trading capital to generate your guaranteed minimum 8% monthly returns.",
        icon: IndianRupee
    },
    {
        title: "Trading and returns",
        content: "We'll actively trade with your 20% risk capital while keeping 80% of your investment secure. You'll have access to a dashboard showing your returns and portfolio performance. We charge just 5% of profits generated - we only earn when you earn. You're guaranteed a minimum 8% monthly return on your total investment.",
        icon: ChartCandlestick
    },
    {
        title: "Regular updates and growth",
        content: "We provide regular updates on your portfolio performance through your personalized dashboard. We recommend maintaining your investment for at least 3 months to experience optimal returns. After this period, you can withdraw your funds anytime, including your secure 80% and all accumulated profits.",
        icon: LayoutDashboard
    }
]

const GetStarted = () => {

    return (
        // Use theme background implicitly or explicitly set if needed e.g., className="bg-background"
        <div className="flex flex-col w-full justify-center">
            <div className="flex flex-col w-full px-4 lg:w-3/4 mx-auto gap-8">
                {/* Use theme foreground color for the main title */}
                <h2 className="text-4xl font-bold text-center text-foreground">Steps to invest with us</h2>

                {/* Container for the steps cards */}
                <div className="flex flex-col w-full gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="w-full relative">
                            {/* Card using theme colors: bg-card, text-card-foreground, border */}
                            <div className="relative z-10 bg-card text-card-foreground rounded-xl shadow-xl overflow-hidden cursor-pointer border"> {/* Applied theme colors */}
                                <div className="p-6"> {/* Padding for the card content */}
                                    {/* Header Section: Icon and Title */}
                                    <div className="flex flex-col items-center text-center mb-4">
                                        {/* Icon Container using theme accent colors: bg-accent, border */}
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-accent border"> {/* Applied theme colors */}
                                            {/* Icon using theme accent-foreground color */}
                                            <step.icon className="w-7 h-7 text-accent-foreground" /> {/* Applied theme color */}
                                        </div>
                                        {/* Title using theme card-foreground color (inherited, but can be explicit) */}
                                        <h3 className="text-xl md:text-2xl font-semibold text-card-foreground">{step.title}</h3> {/* Applied theme color */}
                                    </div>

                                    {/* Content Section: Description */}
                                    <div>
                                        {/* Paragraph using theme muted-foreground color */}
                                        <p className="text-sm md:text-base text-muted-foreground text-center">{step.content}</p> {/* Applied theme color */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GetStarted;