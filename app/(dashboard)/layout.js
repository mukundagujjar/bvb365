import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import Navbar from "@/components/Navbar";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const DashboardLayout = async ({ children }) => {

    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.className} dark`}>
                <AuthProvider>
                <div className="flex flex-col h-dvh w-full overflow-hidden">
                    <Navbar/>
                    {/* <div className="flex flex-col h-dvh w-full overflow-hidden p-4"> */}
                        {children}
                    {/* </div> */}
                </div>
                </AuthProvider>
                {/* <Analytics /> */}
            </body>
        </html>
    );
}

export default DashboardLayout;