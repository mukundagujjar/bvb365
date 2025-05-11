"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const SidebarItem = ({ href, name, icon }) => {

    const pathname = usePathname();

    return (
        <Link href={href} prefetch={true} className={`flex items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-muted ${pathname === href ? "bg-tertiary text-secondary" : ""}`}>
            {icon}
            {name}
        </Link>
    )
}

export default SidebarItem