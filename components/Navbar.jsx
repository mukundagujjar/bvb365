"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Merriweather } from "next/font/google"
import Image from "next/image"

const NavbarRoutes = [
    { id: 1, title: "Our services", href: "/services" },
    { id: 2, title: "About", href: "/about" },
    { id: 3, title: "Contact", href: "/contact" },
    { id: 4, title: "Legal", href: "/legal" }
]

const NavbarFont = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"]
})

const Navbar = () => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Common link styling
    const linkStyle = `font-semibold px-4 py-2 rounded-lg`

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 text-foreground">
            {/* Main navbar container */}
            <div className="flex items-center justify-between w-full px-8 py-6 bg-background/80 backdrop-blur-xl ">
                {/* Logo */}
                <div className="flex items-center justify-center gap-4 select-none cursor-pointer">
                <Link href="/">
                <Image src="bvb-nav.svg" alt="logo" width={50} height={50} />
                </Link>
                <Link href="/" className="font-black tracking-tight hidden md:block text-3xl">Bulls v/s Bears</Link>
                </div>
                

                {/* Desktop Navigation */}
                <div className="hidden lg:flex gap-18 items-center justify-self-end ">
                    {NavbarRoutes.map(route => (
                        <Link
                            key={route.id}
                            href={route.href}
                            prefetch
                            className={`${linkStyle} ${pathname === route.href ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
                        >
                            {route.title}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation - with combined fade and slide transition */}
            <div
                className={`
                    lg:hidden 
                    absolute 
                    top-full 
                    left-0 
                    right-0 
                    bg-background/80
                    backdrop-blur-xl
                    transform
                    transition-all
                    duration-300
                    ease-in-out
                    ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                `}
            >
                <div className="flex flex-col p-6 space-y-4">
                    {NavbarRoutes.map(route => (
                        <Link
                            key={route.id}
                            href={route.href}
                            prefetch
                            onClick={() => setIsMenuOpen(false)}
                            className={`${linkStyle} ${pathname === route.href ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
                        >
                            {route.title}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar