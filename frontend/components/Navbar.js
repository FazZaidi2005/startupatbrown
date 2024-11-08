import Link from "next/link";

export default function Navbar({ isLanding }) {
    const linkStyling = `text-gray-500 hover:text-red-600 focus:text-red-500 transition duration-200 ease-in-out ${!isLanding && "hidden sm:inline"}`;

    return (
        <div className="fixed top-0 right-0 p-4 w-full flex justify-between items-center font-display bg-white z-50 shadow-md">
            <Link href="/">
                <a className="font-semibold text-gray-700 text-xl">
                    Startup<span className="font-sans text-gray-300 font-light">@</span>Brown
                </a>
            </Link>
            <div className="flex items-center space-x-4 md:space-x-6">
                <Link href="/about">
                    <a className={linkStyling}>About</a>
                </Link>
                <Link href="/events">
                    <a className={linkStyling}>Events</a>
                </Link>
                <Link href="/listings">
                    <a className={linkStyling}>Opportunities</a>
                </Link>
                <Link href="/resources">
                    <a className={linkStyling}>Resources</a>
                </Link>
                <Link href="/contact">
                    <a className={linkStyling}>Join Us</a>
                </Link>
            </div>
        </div>
    );
}
