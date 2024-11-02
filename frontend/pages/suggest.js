import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { createResourceSuggestion } from "../lib/firebase-config";
import { useRouter } from "next/router";
import { ArrowLeft, Loader2 } from 'lucide-react';

const Suggest = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        category: "",
        description: ""
    });

    const categories = [
        "Internships & Fellowships",
        "Venture Capital Programs",
        "Academic Programs",
        "Events & Competitions",
        "Student Groups",
        "Accelerators & Support",
        "Grants & Funding"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const validateForm = () => {
        const requiredFields = ['name', 'url', 'category', 'description'];
        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                throw new Error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
            }
        }

        // Add https:// if missing
        if (!formData.url.startsWith('http://') && !formData.url.startsWith('https://')) {
            formData.url = `https://${formData.url}`;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            validateForm();
            const response = await createResourceSuggestion(formData);
            if (response.success) {
                setSubmitted(true);
            } else {
                throw new Error(response.error || "Failed to submit suggestion");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Suggest a Resource | Venture@Brown</title>
            </Head>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Navbar />

                <Link href="/resources">
                    <a className="inline-flex items-center text-red-600 hover:text-red-500 font-medium mt-12">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Resources
                    </a>
                </Link>

                <div className="mt-8">
                    {submitted ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Thank you for your suggestion!
                            </h2>
                            <p className="text-gray-600 mb-8">
                                We'll review your submission and add it to our resource directory if it meets our criteria.
                            </p>
                            <Link href="/resources">
                                <a className="text-red-600 font-semibold hover:text-red-500">
                                    ← Return to Resources
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Suggest a Resource
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Help us grow our directory by suggesting valuable resources for the Brown entrepreneurship community.
                            </p>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-gray-700 font-medium">
                                        Resource Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="e.g., Brown Venture Fellowship"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="url" className="block text-gray-700 font-medium">
                                        Website URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="url"
                                        name="url"
                                        type="text"
                                        value={formData.url}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="block text-gray-700 font-medium">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-gray-700 font-medium">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Please provide a brief description of this resource..."
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
                                            "Submit Suggestion"
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

export default Suggest;