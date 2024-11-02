import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase-config';
import Modal from '../components/Modal';
import { Calendar, MapPin } from 'lucide-react';

const calendarStyles = `
  /* General calendar styling */
  .fc {
    --fc-border-color: #e5e7eb;
    --fc-today-bg-color: #fef2f2;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Inter, sans-serif;
  }

  /* Toolbar and title */
  .fc .fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
  }
  .fc .fc-toolbar-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    text-align: center;
    flex-grow: 1;
    margin: 0 1rem;
    letter-spacing: -0.025em;
  }

  /* Button styling */
  .fc .fc-button {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    color: #374151;
    padding: 0.625rem 1rem;
    border-radius: 0.75rem;
    transition: all 0.15s ease;
  }
  .fc .fc-button:hover {
    background-color: #f9fafb;
    color: #dc2626;
  }

  /* Day grid and event styling */
  .fc .fc-daygrid-day-frame {
    min-height: 100px;
  }
  .fc .fc-daygrid-day-number {
    font-size: 0.875rem;
    color: #4b5563;
  }
  .fc-event {
    border-radius: 6px;
    background-color: #dc2626 !important;
    padding: 4px;
  }
  .fc-event:hover {
    background-color: #ef4444 !important;
  }

  /* Today’s date styling */
  .fc-day-today {
    background-color: #fef2f2 !important;
  }
`;

const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const eventsQuery = query(
                collection(db, 'events'),
                orderBy('start', 'asc')
            );
            const querySnapshot = await getDocs(eventsQuery);
            const eventsList = querySnapshot.docs
                .map(doc => {
                    const data = doc.data();
                    if (!data.start || !data.end) return null;
                    
                    try {
                        return {
                            id: doc.id,
                            ...data,
                            start: data.start.toDate(),
                            end: data.end.toDate(),
                            allDay: data.allDay || false,
                            title: data.title || 'Untitled Event',
                            location: data.location || '',
                            description: data.description || '',
                            display: 'block'
                        };
                    } catch (e) {
                        console.error(`Error processing event ${doc.id}:`, e);
                        return null;
                    }
                })
                .filter(event => event !== null);
            
            setEvents(eventsList);
        } catch (err) {
            setError('Failed to fetch events');
            console.error('Error fetching events:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatEventTime = (event) => {
        if (!event?.start || !event?.end) return '';
        
        const startTime = event.start.toLocaleTimeString([], { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true
        });
        const endTime = event.end.toLocaleTimeString([], { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true
        });
        return `${startTime} - ${endTime}`;
    };

    const renderEventContent = (eventInfo) => {
        if (!eventInfo?.event) return null;
        
        return (
            <div className="p-2 rounded-md bg-red-600 text-white text-sm font-medium truncate">
                {eventInfo.event.title || 'Untitled Event'}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Events | Venture@Brown</title>
                <meta name="description" content="Entrepreneurship events calendar for Brown and RISD" />
                <style>{calendarStyles}</style>
            </Head>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center max-w-3xl mx-auto mt-16 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Events Calendar</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Stay up to date with entrepreneurship events and opportunities
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-32">Loading...</div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mx-auto max-w-2xl">
                        <p className="text-red-700">{error}</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 pb-8">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev',
                                center: 'title',
                                right: 'next'
                            }}
                            events={events}
                            eventClick={(info) => setSelectedEvent(events.find(e => e.id === info.event.id))}
                            height="auto"
                            contentHeight={800}
                            eventContent={renderEventContent}
                            eventDisplay="block"
                            dayMaxEvents={3}
                            moreLinkContent={(args) => `+${args.num} more`}
                            moreLinkClassNames="text-red-600 font-medium text-sm"
                        />
                    </div>
                )}

                {selectedEvent && (
                    <Modal onClose={() => setSelectedEvent(null)}>
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                {selectedEvent.title}
                            </h2>
                            <div className="space-y-6">
                                {selectedEvent.description && (
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {selectedEvent.description}
                                    </p>
                                )}
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 mt-1 text-red-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {selectedEvent.start.toLocaleDateString([], {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        {!selectedEvent.allDay && (
                                            <p className="text-gray-600 mt-1">
                                                {formatEventTime(selectedEvent)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {selectedEvent.location && (
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 mt-1 text-red-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">Location</p>
                                            <p className="text-gray-600">{selectedEvent.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Events;