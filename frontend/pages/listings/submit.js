import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import { useRouter } from "next/router";

const SubmitListing = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        companyName: "",
        positionType: "",
        jobDescription: "",
        timeCommitment: "",
        duration: "",
        contactInfo: "",
        additionalNotes: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = ['companyName', 'positionType', 'jobDescription', 'timeCommitment', 'contactInfo'];
        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                throw new Error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
            }
        }
        
        if (formData.contactInfo.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.contactInfo)) {
                throw new Error('Please enter a valid email address');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            validateForm();
            
            const listingData = {
                ...formData,
                datePosted: new Date(),
            };
            
            await addDoc(collection(db, "listings"), listingData);
            
            alert("Listing successfully added!");
            router.push('/listings');
        } catch (error) {
            setError(error.message || "Error adding listing. Please try again.");
            console.error("Error adding listing: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const positionTypes = ["Co-founder", "Internship", "Tech help", "Design help"];

    return (
        <>
            <Head>
                <title>Submit Listing | Venture@Brown</title>
                <meta name="description" content="Submit a new opportunity listing" />
            </Head>
            
            <div className="max-w-4xl mx-auto px-4 my-12 sm:my-24">
                <Navbar />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                    <button
                        onClick={() => router.push('/listings')}
                        className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                        aria-label="Return to listings page"
                    >
                        ← Back to Listings
                    </button>
                    <h1 className="text-5xl font-bold text-gray-900 font-display">Submit Listing</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 text-red-700 text-lg rounded-xl" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label htmlFor="companyName" className="block text-xl font-semibold text-gray-700">
                                Company Name*
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                                placeholder="Enter your company name"
                                aria-required="true"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="positionType" className="block text-xl font-semibold text-gray-700">
                                Position Type*
                            </label>
                            <select
                                id="positionType"
                                name="positionType"
                                value={formData.positionType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                                aria-required="true"
                            >
                                <option value="">Select a position type</option>
                                {positionTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="jobDescription" className="block text-xl font-semibold text-gray-700">
                                Job Description*
                            </label>
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm h-48"
                                placeholder="Describe the role and responsibilities"
                                aria-required="true"
                            />
                            <p className="text-sm text-gray-500">
                                Provide a detailed description of the role, responsibilities, and requirements.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="timeCommitment" className="block text-xl font-semibold text-gray-700">
                                    Time Commitment*
                                </label>
                                <input
                                    id="timeCommitment"
                                    type="text"
                                    name="timeCommitment"
                                    value={formData.timeCommitment}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                                    placeholder="e.g., Full-time, Part-time"
                                    aria-required="true"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="duration" className="block text-xl font-semibold text-gray-700">
                                    Duration
                                </label>
                                <input
                                    id="duration"
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                                    placeholder="e.g., 3 months, 6 months"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="contactInfo" className="block text-xl font-semibold text-gray-700">
                                Contact Information*
                            </label>
                            <input
                                id="contactInfo"
                                type="text"
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                                placeholder="Email or phone number"
                                aria-required="true"
                            />
                            <p className="text-sm text-gray-500">
                                Enter an email address or phone number where applicants can reach you.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="additionalNotes" className="block text-xl font-semibold text-gray-700">
                                Additional Notes
                            </label>
                            <textarea
                                id="additionalNotes"
                                name="additionalNotes"
                                value={formData.additionalNotes}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm h-32"
                                placeholder="Any additional information"
                            />
                            <p className="text-sm text-gray-500">
                                Optional: Include any additional details or requirements.
                            </p>
                        </div>

                        <div className="pt-6">
                            <p className="text-sm text-gray-500 mb-4">* Required fields</p>
                            <button
                                type="submit"
                                className="w-full px-6 py-4 bg-red-600 text-white text-xl font-semibold rounded-xl hover:bg-red-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isLoading}
                                aria-label={isLoading ? "Submitting listing..." : "Submit listing"}
                            >
                                {isLoading ? "Submitting..." : "Submit Listing"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubmitListing;