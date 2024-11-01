import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import { useRouter } from "next/router";
import { ArrowLeft, Loader2 } from 'lucide-react';

const SubmitListing = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        companyName: "",
        positionType: "",
        jobDescription: "",
        timeCommitment: "",
        duration: "",
        contactInfo: "",
        additionalNotes: ""
    });

    const positionTypes = ["Co-founder", "Internship", "Tech help", "Design help"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        setError("");

        try {
            validateForm();
            
            const listingData = {
                ...formData,
                datePosted: new Date()
            };

            await addDoc(collection(db, "listings"), listingData);
            setSubmitted(true);
        } catch (error) {
            setError(error.message || "Error adding listing. Please try again.");
            console.error("Error adding listing:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Post an Opportunity | Venture@Brown</title>
            </Head>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Navbar />

                <button
                    onClick={() => router.push('/listings')}
                    className="inline-flex items-center text-red-600 hover:text-red-500 font-medium mt-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Listings
                </button>

                <div className="mt-8">
                    {submitted ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Thank you for posting!
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Your opportunity listing has been submitted successfully.
                            </p>
                            <button
                                onClick={() => router.push('/listings')}
                                className="text-red-600 font-semibold hover:text-red-500"
                            >
                                ← Return to Listings
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Post an Opportunity
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Share your job or internship opportunity with the Brown entrepreneurship community.
                            </p>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="companyName" className="block text-gray-700 font-medium">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Enter company name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="positionType" className="block text-gray-700 font-medium">
                                        Position Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="positionType"
                                        name="positionType"
                                        value={formData.positionType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                    >
                                        <option value="">Select a position type</option>
                                        {positionTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="jobDescription" className="block text-gray-700 font-medium">
                                        Job Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="jobDescription"
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Describe the role and responsibilities"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="timeCommitment" className="block text-gray-700 font-medium">
                                        Time Commitment <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="timeCommitment"
                                        name="timeCommitment"
                                        type="text"
                                        value={formData.timeCommitment}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="e.g., Full-time, Part-time"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="duration" className="block text-gray-700 font-medium">
                                        Duration
                                    </label>
                                    <input
                                        id="duration"
                                        name="duration"
                                        type="text"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="e.g., 3 months, 6 months"
                                    />
                                </div>

                                <div className="space-y-2">
    <label htmlFor="contactInfo" className="block text-gray-700 font-medium">
        Contact Information (Email) <span className="text-red-500">*</span>
    </label>
    <input
        id="contactInfo"
        name="contactInfo"
        type="email"  // Updated to enforce email format
        value={formData.contactInfo}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
        placeholder="Enter a valid email address"
    />
</div>

                                <div className="space-y-2">
                                    <label htmlFor="additionalNotes" className="block text-gray-700 font-medium">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        id="additionalNotes"
                                        name="additionalNotes"
                                        value={formData.additionalNotes}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Any additional information or requirements"
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex items-center px-6 py-3 text-white bg-red-600 rounded-lg font-medium
                                                 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Listing"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitListing;