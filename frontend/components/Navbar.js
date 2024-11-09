import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle window resize and set mobile state
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const linkStyling = "text-gray-700 hover:text-red-600 focus:text-red-600 transition duration-200 ease-in-out";

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
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex-shrink-0 font-semibold text-gray-700 text-2xl cursor-pointer">
                            Startup<span className="font-sans text-gray-300 font-light">@</span>Brown
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <div className={`${linkStyling} text-lg cursor-pointer`}>
                                    {link.label}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Toggle menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobile && (
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <div 
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
