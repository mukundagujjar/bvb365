import Link from 'next/link';

export default function GlobalLink({ href, title, additionalClasses }) {
    return (
        <Link href={href} className={`px-8 py-2 md:px-12 md:py-4 md:text-2xl font-bold w-fit cursor-pointer rounded-lg ${additionalClasses} `}>
            {title}
        </Link>
    );
}
