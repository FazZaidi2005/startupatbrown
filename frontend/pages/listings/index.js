import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import Link from "next/link";

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");

    const positionTypes = ["Co-founder", "Internship", "Tech help", "Design help"];

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setIsLoading(true);
                const listingsQuery = query(
                    collection(db, "listings"),
                    orderBy("datePosted", "desc"),
                    limit(50)
                );
                const querySnapshot = await getDocs(listingsQuery);
                const data = querySnapshot.docs.map(doc => ({ 
                    ...doc.data(), 
                    id: doc.id,
                    datePosted: doc.data().datePosted?.toDate() || new Date()
                }));
                setListings(data);
            } catch (err) {
                setError("Failed to fetch listings. Please try again later.");
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
        if (filter === "all") return true;
        return listing.positionType === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 pt-16 pb-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold mb-4">
                            Find Your Next <span className="text-red-600">Venture</span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Connect with Brown startups and find opportunities to make an impact.
                        </p>
                        <Link 
                            href="/listings/submit" 
                            className="post-opportunity-button inline-block text-xl font-semibold px-8 py-4 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
                        >
                            Post an Opportunity →
                        </Link>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-semibold">Current Opportunities</h2>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="all">All Positions</option>
                            {positionTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredListings.map((listing) => (
                                <div key={listing.id} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                                                    {listing.companyName}
                                                </h3>
                                                <span className="inline-block bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-sm font-medium">
                                                    {listing.positionType}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(listing.datePosted).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex gap-4 text-gray-600 text-sm mb-4">
                                            <span>{listing.timeCommitment}</span>
                                            <span>{listing.duration}</span>
                                        </div>

                                        {selectedListing?.id === listing.id && (
                                            <div className="mb-4 text-gray-700 whitespace-pre-wrap">
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
                                                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 text-sm font-medium shadow-sm transition-all"
                                            >
                                                Contact
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listings;
