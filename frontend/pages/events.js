import Head from 'next/head';
import Navbar from '../components/Navbar';
import { CalendarPlus } from 'lucide-react';

const Events = () => {
    const calendarId = 'your_calendar_id@group.calendar.google.com'; // Replace with your Google Calendar ID
    const calendarSrc = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America/New_York`;
    const calendarSubscribeLink = `https://calendar.google.com/calendar/r?cid=${calendarId}`;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Events | Venture@Brown</title>
                <meta name="description" content="Entrepreneurship events calendar for Brown and RISD" />
            </Head>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Events Calendar</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Stay up to date with entrepreneurship events and opportunities.
                    </p>
                </div>

                {/* Embed Google Calendar */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 pb-8">
                    <iframe
                        src={calendarSrc}
                        style={{ border: 0 }}
                        width="100%"
                        height="800"
                        frameBorder="0"
                        scrolling="no"
                        className="rounded-2xl w-full"
                    ></iframe>
                </div>

                {/* Subscription Button */}
                <div className="text-center mt-8">
                    <a
                        href={calendarSubscribeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        <CalendarPlus className="w-5 h-5 mr-2" />
                        Subscribe to Calendar
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Events;
