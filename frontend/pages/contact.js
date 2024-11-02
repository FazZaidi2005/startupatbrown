import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { createJoinUsSubmission } from "../lib/firebase-config";
import { Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        message: "", 
        ventureName: "", 
        ideaDescription: "", 
        yearAtBrownOrRISD: "", 
        affiliation: "" 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const validateForm = () => {
        const requiredFields = ['name', 'email', 'ventureName', 'ideaDescription', 'yearAtBrownOrRISD', 'affiliation'];
        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                throw new Error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Please enter a valid email address');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            validateForm();
            const response = await createJoinUsSubmission(formData);
            if (response.success) {
                setSubmitted(true);
            } else {
                throw new Error(response.error || "Failed to submit form");
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
                <title>Join Us | Venture@Brown</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Navbar />

                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">
                        Join Us
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Are you working on a new venture? Reach out to us for support or guidance from the Brown EP Venture Team.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                    {submitted ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Thank you for reaching out to us!
                            </h2>
                            <p className="text-gray-600 mb-8">
                                We have received your request and will get back to you shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-gray-700 font-medium">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-gray-700 font-medium">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Your email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="ventureName" className="block text-gray-700 font-medium">
                                        Venture Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="ventureName"
                                        name="ventureName"
                                        type="text"
                                        value={formData.ventureName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Your venture name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="ideaDescription" className="block text-gray-700 font-medium">
                                        Brief Description of Your Idea <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="ideaDescription"
                                        name="ideaDescription"
                                        value={formData.ideaDescription}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="Tell us about your idea"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="yearAtBrownOrRISD" className="block text-gray-700 font-medium">
                                        Year at Brown or RISD <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="yearAtBrownOrRISD"
                                        name="yearAtBrownOrRISD"
                                        type="text"
                                        value={formData.yearAtBrownOrRISD}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="e.g., Sophomore, Junior"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="affiliation" className="block text-gray-700 font-medium">
                                        Are you affiliated with Brown or RISD? <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="affiliation"
                                        name="affiliation"
                                        type="text"
                                        value={formData.affiliation}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                                        placeholder="e.g., Brown, RISD"
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
                                            "Submit"
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

export default Contact;