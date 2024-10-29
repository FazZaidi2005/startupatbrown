import Head from "next/head";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from "../lib/firebase-config"; // Update with your Firebase initialization

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        description: "",
        type: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch listings from Firestore on load
    useEffect(() => {
        const fetchListings = async () => {
            const querySnapshot = await getDocs(collection(db, "listings")); // Use db directly
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setListings(data);
        };
        fetchListings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await addDoc(collection(db, "listings"), formData);
            setListings([...listings, formData]);
            setFormData({ name: "", email: "", title: "", description: "", type: "" });
            alert("Listing successfully added!");
        } catch (error) {
            console.error("Error adding listing: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Listings | Venture@Brown</title>
            </Head>
            <div className="max-w-3xl mx-auto px-4 my-24">
                <Navbar />
                <h1 className="text-5xl font-bold text-gray-900 font-display">Opportunities</h1>
                
                {/* Form Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit a Listing</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="Title of Listing (e.g., Looking for a Co-founder)"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                            name="description"
                            placeholder="Describe what you're looking for or offering..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                        />
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Type</option>
                            <option value="Looking for Help">Looking for Help</option>
                            <option value="Offering Internship">Offering Internship</option>
                            <option value="Looking for Co-founder">Looking for Co-founder</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit Listing"}
                        </button>
                    </form>
                </section>

                {/* Listings Section */}
                <section className="mt-16">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Current Listings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {listings.map((listing, index) => (
                            <div key={index} className="border p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-700">{listing.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{listing.type}</p>
                                <p className="text-gray-600 mb-4">{listing.description}</p>
                                <a
                                    href={`mailto:${listing.email}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Contact {listing.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Listings;
