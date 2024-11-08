import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";

const VentureTeam = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Startup@Brown</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Navbar />

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">
                        Startup@Brown
                    </h1>
                    <p className="text-xl text-gray-600">
                        Empowering student entrepreneurs through venture support, mentorship, and building a strong startup community at Brown University.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats and Mission Section */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* EP Venture Team Description */}
                        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                                EP Venture Team
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed text-center">
                                We are Brown University's premier student-led venture support organization, dedicated to fostering the next generation of entrepreneurs. Our mission is to transform innovative ideas into successful ventures by providing comprehensive support at every stage of the entrepreneurial journey. Through our extensive network of industry experts, investors, and successful founders, we offer personalized guidance, strategic resources, and invaluable connections to help Brown and RISD students build and scale impactful companies. From ideation to market entry, we're committed to being your trusted partner in turning entrepreneurial aspirations into reality.
                            </p>
                        </div>

                        {/* Stats Column */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-center">
                            <div className="space-y-6">
                                <div className="border-b border-gray-100 pb-6">
                                    <div className="text-gray-600 text-sm mb-2">Venture Partners</div>
                                    <div className="text-5xl font-bold text-red-600">6</div>
                                </div>
                                <div className="border-b border-gray-100 pb-6">
                                    <div className="text-gray-600 text-sm mb-2">Startups Supported</div>
                                    <div className="text-5xl font-bold text-red-600">40+</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 text-sm mb-2">Our Commitment to Your Success</div>
                                    <div className="text-5xl font-bold text-red-600">∞</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="group bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                            <div className="h-12 w-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Events</h3>
                            <p className="text-white/90 mb-6">
                                Stay updated with the latest workshops, networking opportunities, and startup events at Brown.
                            </p>
                            <Link href="/events">
                                <a className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                                    View Calendar
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </Link>
                        </div>

                        <div className="group bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                            <div className="h-12 w-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Opportunities</h3>
                            <p className="text-white/90 mb-6">
                                Discover exciting opportunities to get involved in the startup community and connect with like-minded peers.
                            </p>
                            <Link href="/listings">
                                <a className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                                    Browse Listings
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </Link>
                        </div>

                        <div className="group bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                            <div className="h-12 w-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Resources</h3>
                            <p className="text-white/90 mb-6">
                                Access programs, grants, and comprehensive support to help launch and scale your venture successfully.
                            </p>
                            <Link href="/resources">
                                <a className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                                    Access Resources
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* Contact Banner */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h2>
                            <p className="text-gray-600 text-lg mb-6">
                                Whether you're just starting out or looking to scale, we're here to support your entrepreneurial journey.
                            </p>
                            <Link href="/contact">
                                <a className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200">
                                    Get in Touch
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* Nelson Center Link */}
                    <div className="text-center pb-12">
                        <a 
                            href="https://entrepreneurship.brown.edu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-lg text-gray-600 hover:text-red-600 transition-colors duration-200"
                        >
                            Visit the Nelson Center for Entrepreneurship
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VentureTeam;
