import Head from 'next/head';
import Navbar from '../components/Navbar';
import { CalendarPlus } from 'lucide-react';

const Events = () => {
    const calendarId = 'c_1ef5e176db9f1962a856f4029a96cfd9d0a8bbdb581e3dc7960855bbbc876cd2@group.calendar.google.com';
    const calendarSrc = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America/New_York`;
    const calendarSubscribeLink = `https://calendar.google.com/calendar/r?cid=${calendarId}`;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Events | Venture@Brown</title>
                <meta name="description" content="Entrepreneurship events calendar for Brown and RISD" />
            </Head>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 font-display mb-6">Events Calendar</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Stay up to date with entrepreneurship events and opportunities.
                    </p>
                    <a
                        href={calendarSubscribeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-500 transition-colors duration-200"
                    >
                        <CalendarPlus className="w-5 h-5" />
                        <span>Subscribe to Calendar</span>
                    </a>
                </div>

                {/* Embed Google Calendar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 pb-8">
                    <iframe
                        src={calendarSrc}
                        style={{ border: 0 }}
                        width="100%"
                        height="850"
                        frameBorder="0"
                        scrolling="no"
                        className="rounded-xl w-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Events;