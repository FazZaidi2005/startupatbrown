import Link from 'next/link';
import Navbar from "./Navbar";

export default function Landing() {
    return (
        <div className="font-display max-w-screen-md mx-auto text-center py-20">
            <Navbar isLanding />

            {/* Logo Image */}
            <div className="flex justify-center mb-0">
                <img 
                    src="/resource_images/brown_ep_logo.png"  // Ensure this path is correct
                    alt="Brown EP Logo" 
                    style={{ width: '500px', height: 'auto' }}  // Set explicit width to 4x larger
                    className="mb-0" 
                />
            </div>

            {/* Heading and Subheading */}
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-0">
                    Startup<span className="font-sans text-gray-400 font-light">@</span>Brown
                </h1>
                <p className="text-xl text-gray-500 mt-4">
                    A guide to help Brown and RISD students navigate the entrepreneurial resources on College Hill.
                </p>

                {/* Button to Redirect to About Page */}
                <div className="mt-8">
                    <Link href="/about">
                        <a className="bg-red-600 inline-block font-medium text-lg rounded-lg py-3 px-12 text-white transition-all duration-200 hover:bg-red-500 focus:bg-red-500">
                            Let's get started
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
