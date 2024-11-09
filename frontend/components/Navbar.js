import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = ({ isLanding }) => {
    const [isOpen, setIsOpen] = useState(false);

    const linkStyling = `text-gray-500 hover:text-red-600 focus:text-red-500 transition duration-200 ease-in-out`;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { href: "/about", label: "About" },
        { href: "/events", label: "Events" },
        { href: "/listings", label: "Opportunities" },
        { href: "/resources", label: "Resources" },
        { href: "/contact", label: "Join Us" },
    ];

    return (
        <nav className="fixed top-0 right-0 w-full bg-white z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <a className="flex-shrink-0 font-semibold text-gray-700 text-xl font-display">
                            Startup<span className="font-sans text-gray-300 font-light">@</span>Brown
                        </a>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <a className={`${linkStyling} text-base`}>{link.label}</a>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button - Explicitly hidden on desktop */}
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <a 
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-red-600 hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;