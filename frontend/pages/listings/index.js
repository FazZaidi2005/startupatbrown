import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Search, ExternalLink } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../lib/firebase-config";

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const positionTypes = ["Co-founder", "Internship", "Tech help", "Design help"];

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setIsLoading(true);
                // Change collection to "opportunityListings"
                const listingsQuery = query(
                    collection(db, "opportunityListings"),
                    orderBy("createdAt", "desc"), // Updated to use "createdAt" since "datePosted" doesn't exist
                    limit(50)
                );
                const querySnapshot = await getDocs(listingsQuery);
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                    createdAt: doc.data().createdAt?.toDate() || new Date()
                }));
                setListings(data);
            } catch (err) {
                console.error("Error fetching listings:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleViewDetails = (listing) => {
        setSelectedListing(selectedListing?.id === listing.id ? null : listing);
    };

    const filteredListings = listings.filter(listing => {
        const matchesFilter = filter === "all" || listing.positionType === filter;
        const matchesSearch = listing.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              listing.jobDescription.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getPositionTypeColor = (positionType) => {
        switch (positionType) {
            case "Co-founder":
                return "bg-orange-100";
            case "Internship":
                return "bg-green-100";
            case "Tech help":
                return "bg-purple-100";
            case "Design help":
                return "bg-yellow-100";
            default:
                return "bg-gray-100";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Opportunities | Venture@Brown</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Navbar />

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">
                        Venture Opportunities
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Connect with Brown startups and find impactful opportunities.
                    </p>
                    <Link href="/listings/submit">
                        <a className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-500 transition-colors duration-200">
                            <ExternalLink className="w-5 h-5" />
                            <span>Post an Opportunity</span>
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
                            placeholder="Search all opportunities..."
                            className="block w-full pl-12 pr-4 py-3 text-lg rounded-xl border border-gray-200 
                                     focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200
                                     hover:border-gray-300 bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-6 justify-center">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 
                                ${filter === "all" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                        >
                            All Positions
                        </button>
                        {positionTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 
                                    ${filter === type ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Listings Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {isLoading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : (
                        filteredListings.map((listing) => (
                            <div key={listing.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-semibold text-gray-900">{listing.companyName}</h3>
                                        <span className="text-sm text-gray-500">
                                            {new Date(listing.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 text-sm my-2">
                                        <span className={`px-3 py-1 rounded-full ${getPositionTypeColor(listing.positionType)}`}>{listing.positionType}</span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">{listing.timeCommitment}</span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">{listing.duration}</span>
                                    </div>
                                    
                                    {selectedListing?.id === listing.id && (
                                        <div className="mt-4 text-gray-700 whitespace-pre-wrap">
                                            <p>{listing.jobDescription}</p>
                                            {listing.additionalNotes && (
                                                <p className="mt-4 text-gray-600">{listing.additionalNotes}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => handleViewDetails(listing)}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            {selectedListing?.id === listing.id ? 'Show Less' : 'Learn More'}
                                        </button>
                                        <a
                                            href={`mailto:${listing.contactInfo}`}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
                                        >
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listings;
