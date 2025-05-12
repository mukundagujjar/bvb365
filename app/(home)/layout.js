import "@/app/globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import Navbar from "@/components/Navbar";

const bricolageGrotesque = Bricolage_Grotesque({
    variable: "--font-bricolage-grotesque",
    subsets: ["latin"],
  });
  
  export const metadata = {
    title: "Bulls v/s Bears",
    description: "Track your investments with Bulls v/s Bears",
  };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.className} p-4 md:p-8 mt-24 dark`}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
