import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar({ isLanding }) {
    const [isOpen, setIsOpen] = useState(false);

    const linkStyling = "text-gray-500 hover:text-red-600 focus:text-red-500 transition duration-200 ease-in-out";
    const mobileLinkStyling = "text-gray-500 hover:text-red-600 focus:text-red-500 transition duration-200 ease-in-out w-full text-center py-3";

    const navLinks = [
        { href: "/about", text: "About" },
        { href: "/events", text: "Events" },
        { href: "/listings", text: "Opportunities" },
        { href: "/resources", text: "Resources" },
        { href: "/contact", text: "Join Us" },
    ];

    return (
        <>
            <div className="fixed top-0 right-0 p-4 w-full flex justify-between items-center font-display bg-white z-50 shadow-md">
                <Link href="/">
                    <a className="font-semibold text-gray-700 text-xl">
                        Startup<span className="font-sans text-gray-300 font-light">@</span>Brown
                    </a>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <a className={linkStyling}>{link.text}</a>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="sm:hidden p-2 text-gray-500 hover:text-red-600 transition duration-200"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="fixed top-16 left-0 w-full bg-white z-40 shadow-md sm:hidden">
                    <div className="flex flex-col items-center py-2">
                        {navLinks.map((link, index) => (
                            <Link key={link.href} href={link.href}>
                                <a
                                    className={`${mobileLinkStyling} ${index === 0 ? "mt-4" : ""}`} // Adds extra space above the first link
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.text}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
