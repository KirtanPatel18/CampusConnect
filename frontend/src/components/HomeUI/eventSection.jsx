import React from "react";
import { useNavigate } from "react-router-dom";

export const EventsSection = ({isLoggedIn}) => {

    const navigate = useNavigate();

    const handleJoinEvent = () => {
        if(!isLoggedIn) navigate("/login");
    }

  const sampleEvents = [
    {
      title: "Tech Hackathon 2023",
      date: "May 20, 2023",
      location: "Engineering Building",
      attendees: 120,
      image: "https://kzmkc0bzy82lnq214euo.lite.vusercontent.net/placeholder.svg",
      color: "bg-teal-500",
    },
    {
      title: "Career Fair",
      date: "May 25, 2023",
      location: "Student Center",
      attendees: 250,
      image: "https://kzmkc0bzy82lnq214euo.lite.vusercontent.net/placeholder.svg",
      color: "bg-orange-500",
    },
    {
      title: "Research Symposium",
      date: "June 2, 2023",
      location: "Science Complex",
      attendees: 85,
      image: "https://kzmkc0bzy82lnq214euo.lite.vusercontent.net/placeholder.svg",
      color: "bg-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-[#023047] text-white relative overflow-hidden">
      {/* Background & Header */}
      <div className="container max-w-8xl mx-auto relative pt-10 px-20">
        <h2 className="text-3xl font-bold mb-10">Upcoming Events</h2>

        {/* 🔁 Loop through all events */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleEvents.map((event, index) => (
            <EventCard key={index} event={event} handleJoinEvent={handleJoinEvent} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ event , handleJoinEvent}) => {
  return (
    <div className="bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-4 right-4 ${event.color} px-3 py-1 rounded-full text-xs font-medium text-white`}
        >
          {event.attendees} attending
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          📅 {event.date}
        </div>
        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
          📍 {event.location}
        </div>
        <button className="mt-4 w-full border border-teal-600 text-teal-600 py-2 rounded hover:bg-teal-50"
            onClick={handleJoinEvent}>
          Join Event
        </button>
      </div>
    </div>
  );
};

export default EventsSection;
