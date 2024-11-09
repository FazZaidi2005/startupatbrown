import { useState } from 'react';
import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search, Sparkles, ExternalLink } from 'lucide-react';

const CATEGORIES = [
    {
        id: "accelerators",
        name: "Accelerators & Incubators",
        sections: [
            {
                title: "Major Accelerators",
                resources: [
                    { name: "YC", description: "Startup accelerator for early-stage startups", url: "https://www.ycombinator.com/" },
                    { name: "TechStars", description: "Global startup accelerator program", url: "https://www.techstars.com/" },
                    { name: "500 Startups", description: "Seed accelerator program providing funding and mentorship", url: "https://500.co/" },
                    { name: "Alchemist", description: "Accelerator focused on enterprise startups", url: "https://www.alchemistaccelerator.com/" },
                    { name: "PearX", description: "Seed-stage accelerator for high-potential startups", url: "https://www.pear.vc/pearx" }
                ]
            },
            {
                title: "Local & University Accelerators",
                resources: [
                    { name: "Breakthrough Lab (B-Lab)", description: "Brown's summer accelerator for high-impact ventures", url: "https://entrepreneurship.brown.edu/b-lab/" },
                    { name: "MassChallenge RI", description: "Industry-specific accelerator for Rhode Island startups", url: "https://masschallenge.org/programs-rhode-island" },
                    { name: "RIHub", description: "Incubator with pitch scrubs and tech consultation", url: "https://rihub.org/" },
                    { name: "NEMIC", description: "Healthcare accelerator and support program in Rhode Island", url: "https://nemicenter.com/" },
                    { name: "Social Enterprise Greenhouse Impact Accelerator", description: "Accelerator for social enterprises in Rhode Island", url: "https://segreenhouse.org/accelerator/" },
                    { name: "Hope and Main", description: "Rhode Island space for food-related startups", url: "https://hopeandmain.org/" }
                ]
            }
        ]
    },
    {
        id: "fellowships",
        name: "Fellowships & Programs",
        sections: [
            {
                title: "Startup Fellowships",
                resources: [
                    { name: "8VC Fellowship", description: "Immersive 3-month internship placing students into innovative startups", url: "https://www.8vc.com/fellowships/" },
                    { name: "Kleiner Perkins Fellows", description: "Engineering, Design, and Product Fellows programs connecting with startups", url: "https://fellows.kleinerperkins.com/" },
                    { name: "Bessemer Fellows", description: "Internship with tech companies, offering mentorship and community connections", url: "https://www.bvp.com/bessemer-fellows" },
                    { name: "Z Fellows", description: "Fellowship for aspiring entrepreneurs", url: "https://zfellows.com/" },
                    { name: "Soma Fellows", description: "Exclusive fellowship focused on supporting founders", url: "https://www.somafellows.com/" },
                    { name: "a16z Speedrun", description: "Fellowship program by Andreessen Horowitz", url: "https://a16z.com/games/speedrun/" },
                    { name: "IDEO CoLab Fellowship", description: "Research and design fellowship focusing on emerging technologies", url: "https://www.ideocolab.com/" },
                    { name: "Contrary Talent", description: "Venture fund-backed program investing in top early-career talent", url: "https://contrary.com/" }
                ]
            },
            {
                title: "University Fellowships",
                resources: [
                    { name: "Social Innovation Fellowship", description: "Fellowship offering social innovation experience", url: "https://www.brown.edu/academics/college/swearer/programs/social-innovation-fellowship/11" },
                    { name: "Entrepreneurship Internship Abroad", description: "Connects Brown students to global startup internships", url: "https://entrepreneurship.brown.edu/startup-internship-signature-program/" }
                ]
            }
        ]
    },
    {
        id: "venture-capital",
        name: "Venture Capital Opportunities",
        sections: [
            {
                title: "Student VC Programs",
                resources: [
                    { name: "Dorm Room Fund", description: "Student-run venture fund providing $20,000 checks and mentorship", url: "https://www.dormroomfund.com/" },
                    { name: "Contrary Capital", description: "Venture fund backed by founders of Tesla and Reddit", url: "https://contrarycap.com/" },
                    { name: "Van Wickle Ventures", description: "Student-run fund for Brown and RISD-affiliated startups, also invests in alumni ventures", url: "https://www.vanwickleventures.com/" },
                    { name: "Dorm Room Fund Investor Partner", description: "Partner role discovering and backing student founders", url: "https://join.dormroomfund.com/" }
                ]
            },
            {
                title: "VC Education Programs",
                resources: [
                    { name: "Blueprint Investor Track", description: "Eight-week masterclass for diverse aspiring venture investors", url: "https://www.dormroomfund.com/opportunities/" },
                    { name: ".406 Venture Fellow", description: "Fellowship focusing on market-leading companies in key sectors", url: "https://www.406ventures.com/about" },
                    { name: "Venture Capital Inclusion Lab", description: "Research and practitioner lab supporting economic inclusivity", url: "https://vcinclusion.com/" }
                ]
            }
        ]
    },
    {
        id: "education",
        name: "Academic & Educational",
        sections: [
            {
                title: "Degree Programs & Centers",
                resources: [
                    { name: "PRIME (Master's Degree)", description: "STEM Master of Science in Innovation Management and Entrepreneurship", url: "https://www.brown.edu/graduateprograms/innovation-management-and-entrepreneurship-scm" },
                    { name: "Entrepreneurship Certificate", description: "Structured program for entrepreneurship-focused students", url: "https://entrepreneurship.brown.edu/entrepreneurship-certificate/" },
                    { name: "Explore Brown's Entrepreneurial Courses", description: "Variety of courses on entrepreneurship at Brown", url: "https://entrepreneurship.brown.edu/courses/" }
                ]
            },
            {
                title: "Educational Resources",
                resources: [
                    { name: "YC Startup School", description: "Free online program for global founders", url: "https://www.startupschool.org/" },
                    { name: "prepare4vc", description: "Program to help founders prepare for venture funding", url: "https://www.prepare4vc.com/" }
                ]
            }
        ]
    },
    {
        id: "funding",
        name: "Funding Opportunities",
        sections: [
            {
                title: "University Grants",
                resources: [
                    { name: "Explore Grants", description: "Initial funding for student entrepreneurs", url: "https://entrepreneurship.brown.edu/resources/grants-funding/" },
                    { name: "Expand Grants", description: "Grants for entrepreneurial projects", url: "https://entrepreneurship.brown.edu/resources/grants-funding/" },
                    { name: "Climate Change Grants", description: "Funding for student projects addressing climate change", url: "https://entrepreneurship.brown.edu/climate-change-grants" },
                    { name: "Brown Venture Prize", description: "$50,000 prize for advanced entrepreneurial ventures", url: "https://entrepreneurship.brown.edu/the-brown-venture-prize/" }
                ]
            },
            {
                title: "External Funding",
                resources: [
                    { name: "Thiel Fellowship", description: "$100,000 grant and support for young entrepreneurs", url: "https://thielfellowship.org/" },
                    { name: "1517 Fund", description: "VC firm backing early-stage founders", url: "https://www.1517fund.com/" },
                    { name: "Slater Fund", description: "Fund for early-stage startups in Rhode Island", url: "https://slaterfund.com/" },
                    { name: "Unshackled Ventures", description: "Focuses on immigrant founders with visa support", url: "https://www.unshackledvc.com/" }
                ]
            }
        ]
    },
    {
        id: "community",
        name: "Communities & Groups",
        sections: [
            {
                title: "Student Organizations",
                resources: [
                    { name: "Brown EP", description: "Main student entrepreneurship initiative at Brown", url: "https://www.brownentrepreneurship.com/" },
                    { name: "RISD E'Ship", description: "Supports business ventures within art and design", url: "https://www.risdeship.com/" },
                    { name: "Design for America", description: "Community focused on social innovation and design", url: "https://studentactivities.brown.edu/organizations/design-america/" },
                    { name: "Full Stack at Brown", description: "Club promoting software engineering projects", url: "https://studentactivities.brown.edu/organizations/full-stack-brown/" },
                    { name: "RISD IDSA", description: "Exposes students to interdisciplinary design fields", url: "https://www.facebook.com/risdidsa/" }
                ]
            },
            {
                title: "Support & Innovation Spaces",
                resources: [
                    { name: "Community Lab @ Nelson", description: "Community for high-impact and scalable solutions", url: "https://entrepreneurship.brown.edu/community-lab/" },
                    { name: "Sustainable Enterprise Greenhouse", description: "Support for social entrepreneurs", url: "https://segreenhouse.org/" },
                    { name: "CIC", description: "Co-working space with resources for startups", url: "https://cic.com/providence" },
                    { name: "Venture Cafe", description: "Community events for innovators", url: "https://venturecafeprovidence.org/" }
                ]
            },
            {
                title: "Alumni Networks",
                resources: [
                    { name: "Brown Angel Group", description: "Global network of Brown alumni investing in startups", url: "https://www.brownangelgroup.org/" },
                    { name: "Waterman Ventures", description: "Brown alumni venture capital group", url: "https://www.avgfunds.com/waterman-ventures/" }
                ]
            }
        ]
    },
    {
        id: "events",
        name: "Events & Competitions",
        sections: [
            {
                title: "Competitions & Hackathons",
                resources: [
                    { name: "Hack@Brown", description: "Annual hackathon for experimenting with new technologies", url: "https://2024.hackatbrown.org/" },
                    { name: "Innovation Dojo", description: "Workshop series on innovation and entrepreneurship", url: "https://www.brownentrepreneurship.com/dojo" }
                ]
            },
            {
                title: "Conferences & Programs",
                resources: [
                    { name: "Better World by Design", description: "Student-led initiative celebrating interdisciplinary collaboration", url: "http://www.betterworldxdesign.com/" },
                    { name: "Future of Sustainable Investing (FSIcon)", description: "Conference on sustainable investing", url: "https://www.fsicon.com/" },
                    { name: "Synapse Trips", description: "Nelson Center's travel program for entrepreneurs", url: "https://entrepreneurship.brown.edu/beyond-campus/" }
                ]
            }
        ]
    }
];
const Resources = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const filterResources = (categories) => {
        if (searchTerm === "" && activeCategory === "all") {
            return categories;
        }

        return categories.map(category => {
            if (activeCategory !== "all" && category.id !== activeCategory) {
                return null;
            }

            const filteredSections = category.sections.map(section => {
                const filteredResources = section.resources.filter(resource => {
                    if (searchTerm === "") return true;
                    
                    const searchLower = searchTerm.toLowerCase();
                    return (
                        resource.name.toLowerCase().includes(searchLower) ||
                        resource.description.toLowerCase().includes(searchLower)
                    );
                });

                if (filteredResources.length === 0) return null;

                return {
                    ...section,
                    resources: filteredResources
                };
            }).filter(Boolean);

            if (filteredSections.length === 0) return null;

            return {
                ...category,
                sections: filteredSections
            };
        }).filter(Boolean);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Resources | Venture@Brown</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Navbar />
                
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">
                        Venture Resources
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Everything you need to start and grow your venture at Brown.
                    </p>
                    <Link href="/suggest">
                        <a className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-500 transition-colors duration-200">
                            <Sparkles className="w-5 h-5" />
                            <span>Suggest a Resource</span>
                        </a>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search all resources..."
                            className="block w-full pl-12 pr-4 py-3 text-lg rounded-xl border border-gray-200 
                                     focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200
                                     hover:border-gray-300 bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-6 justify-center">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 
                                ${activeCategory === "all" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                        >
                            All Resources
                        </button>
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 
                                    ${activeCategory === category.id ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resources Display */}
                <div className="space-y-12">
                    {filterResources(CATEGORIES).map((category) => (
                        <div key={category.id} className="space-y-8">
                            <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                            
                            {category.sections.map((section, idx) => (
                                <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            {section.title}
                                        </h3>
                                        <div className="space-y-4">
                                            {section.resources.map((resource, resourceIdx) => (
                                                <a
                                                    key={resourceIdx}
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block group"
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0 mt-1">
                                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-gray-900 font-medium group-hover:text-red-600 transition-colors duration-200">
                                                                {resource.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                                                                {resource.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-4">Don't see what you're looking for?</p>
                    <Link href="/suggest">
                        <a className="text-red-600 font-semibold hover:text-red-500 transition-colors duration-200">
                            Suggest a new resource →
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Resources;