import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";

const About = () => {
    return (
        <>
            <Head>
                <title>Startup@Brown</title>
            </Head>
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Page Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Page Header */}
                    <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">
                            Startup@Brown
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Empowering the next generation of entrepreneurs at Brown and RISD.
                        </p>
                    </div>

                    {/* Overview Section */}
                    <div className="bg-white p-10 rounded-lg shadow-sm max-w-5xl mx-auto mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Startup Opportunities at Brown and RISD
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Brown and RISD offer a wealth of resources to help students take their startup ideas to the next level. From funding opportunities and mentorship programs to workshops and networking events, there are countless ways for students to get involved and grow their ventures. Even if you're not ready to start your own company, you can still benefit from the entrepreneurship community by connecting with founders, joining teams, or learning valuable skills through the resources available on this website.
                        </p>
                    </div>

                    {/* Tabs Overview Section */}
                    <div className="grid gap-8 md:grid-cols-3">
                        <Link href="/resources">
                            <a className="block p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-red-50">
                                <h3 className="text-3xl font-semibold text-red-600 mb-4">
                                    Venture Resources
                                </h3>
                                <p className="text-gray-600">
                                    Access a wide range of resources to help you launch and grow your venture, from seed funding to mentorship and venture support.
                                </p>
                            </a>
                        </Link>

                        <Link href="/listings">
                            <a className="block p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-red-50">
                                <h3 className="text-3xl font-semibold text-red-600 mb-4">
                                    Opportunities
                                </h3>
                                <p className="text-gray-600">
                                    Discover exciting opportunities to get involved in the startup community, connect with like-minded peers, and make an impact.
                                </p>
                            </a>
                        </Link>

                        <Link href="/contact">
                            <a className="block p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-red-50">
                                <h3 className="text-3xl font-semibold text-red-600 mb-4">
                                    Contact
                                </h3>
                                <p className="text-gray-600">
                                    Reach out to us for support, guidance, or to learn more about how we can help you succeed in your entrepreneurial journey.
                                </p>
                            </a>
                        </Link>
                    </div>

                    {/* Nelson Center for Entrepreneurship Link */}
                    <div className="text-center mt-16">
                        <p className="text-xl text-gray-600">
                            Explore more entrepreneurial opportunities at the Nelson Center for Entrepreneurship, and learn about the many ways Brown and RISD students can get involved in the startup scene. <a
                                href="https://entrepreneurship.brown.edu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 font-semibold hover:text-red-500 transition-colors duration-200"
                            >
                                Visit the Nelson Center for Entrepreneurship
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
