import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { createSuggestion } from "../lib/firebase-config"; // Make sure this handles Firestore submission
import { Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [highlightedField, setHighlightedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (highlightedField === name) {
            setHighlightedField(null);
        }
    };

    const validateForm = () => {
        if (!formData.name) return { valid: false, field: "name" };
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return { valid: false, field: "email" };
        if (!formData.message) return { valid: false, field: "message" };
        return { valid: true };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const validation = validateForm();
        if (!validation.valid) {
            setHighlightedField(validation.field);
            document.getElementById(validation.field).scrollIntoView({ behavior: "smooth", block: "center" });
            setIsLoading(false);
            return;
        }

        try {
            const response = await createSuggestion({ ...formData, type: "contact_message" });
            if (response.success) {
                setSubmitted(true);
            } else {
                setError("Failed to submit. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error("Error submitting contact message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Contact Us | Venture@Brown</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Navbar />

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Have questions or feedback? Let us know, and we’ll get back to you as soon as possible.
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
                                Thank you for contacting us!
                            </h2>
                            <p className="text-gray-600 mb-8">
                                We have received your message and will get back to you shortly.
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
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            highlightedField === "name"
                                                ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                : "border-gray-200 focus:ring-2 focus:ring-red-200"
                                        } transition-all duration-200`}
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
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            highlightedField === "email"
                                                ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                : "border-gray-200 focus:ring-2 focus:ring-red-200"
                                        } transition-all duration-200`}
                                        placeholder="Your email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-gray-700 font-medium">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            highlightedField === "message"
                                                ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                : "border-gray-200 focus:ring-2 focus:ring-red-200"
                                        } transition-all duration-200`}
                                        placeholder="How can we help you?"
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
