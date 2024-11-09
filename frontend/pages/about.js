import Head from "next/head";
import Navbar from "../components/Navbar";

const venturePartners = [
    {
        name: "Faz Zaidi",
        role: "goat",
        image: "/images/venture_partner_1.jpg"
    },
    {
        name: "Gloria Kuzmenko-Latimer",
        role: "Venture Partner",
        image: "/images/venture_partner_2.jpg"
    },
    {
        name: "Chloe Jazzy Lau",
        role: "Venture Partner",
        image: "/images/venture_partner_3.jpg"
    },
    {
        name: "Jaden Anselmo",
        role: "Venture Partner",
        image: "/images/venture_partner_4.jpg"
    },
    {
        name: "Athena Djojonegoro",
        role: "Venture Partner",
        image: "/images/venture_partner_5.jpg"
    },
    {
        name: "James D'Alessandro",
        role: "Venture Partner",
        image: "/images/venture_partner_6.jpg"
    }
];

const VentureTeam = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* EP Venture Team Description */}
                        <div className="md:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg overflow-hidden flex">
                            <div className="relative p-5 flex flex-col justify-between w-full">
                                <div>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20"></div>
                                    <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                                        EP Venture Team
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            We are Brown University's premier student-led venture support organization, dedicated to fostering the next generation of entrepreneurs. Our mission is to transform innovative ideas into successful ventures by providing comprehensive support at every stage of the entrepreneurial journey. Through our extensive network of industry experts, investors, and successful founders, we offer personalized guidance, strategic resources, and invaluable connections to help Brown and RISD students build and scale impactful companies.
                                        </p>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            From ideation to market entry, we're committed to being your trusted partner in turning entrepreneurial aspirations into reality. Whether you're working on a tech startup, social venture, or creative enterprise, our experienced team provides tailored support to help you navigate the challenges of building a successful company while balancing academic commitments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Column */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg overflow-hidden flex">
                            <div className="w-full flex flex-col justify-between h-full">
                                <div className="group px-5 pt-4 pb-4 hover:scale-110 transition-all duration-300 ease-in-out">
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Venture Partners
                                    </div>
                                    <div className="text-5xl font-bold text-red-500">
                                        6
                                    </div>
                                </div>
                                
                                <div className="mx-5 h-px bg-black"></div>
                                
                                <div className="group px-5 py-4 hover:scale-110 transition-all duration-300 ease-in-out">
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Startups Supported
                                    </div>
                                    <div className="text-5xl font-bold text-red-500">
                                        40+
                                    </div>
                                </div>
                                
                                <div className="mx-5 h-px bg-black"></div>
                                
                                <div className="group px-5 pt-4 pb-4 hover:scale-110 transition-all duration-300 ease-in-out">
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Our Commitment to You
                                    </div>
                                    <div className="text-5xl font-bold text-red-500">
                                        &infin;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg overflow-hidden mt-12 mb-12">
                        <div className="p-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8 text-center">
                                Meet the Venture Partners
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {venturePartners.map((partner, index) => (
                                    <div key={index} className="text-center transform hover:scale-105 transition-transform duration-200">
                                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                                            <img
                                                src={partner.image}
                                                alt={partner.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                                        <p className="text-red-500 font-medium">{partner.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Nelson Center Link */}
                    <div className="text-center pb-8">
                        <a 
                            href="https://entrepreneurship.brown.edu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-lg text-gray-600 hover:text-red-600 transition-colors duration-200 group"
                        >
                            <span className="group-hover:underline">Visit the Nelson Center for Entrepreneurship</span>
                            <svg 
                                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Acknowledgment Note */}
                    <div className="text-center pb-12">
                        <p className="text-sm text-gray-500 italic">
                            Based on ventureatbrown.com, which was created by the EP Tech team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VentureTeam;