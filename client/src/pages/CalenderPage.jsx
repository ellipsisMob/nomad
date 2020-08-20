import React,{ useEffect, useState } from 'react';
import EventsCalender from '../components/calendar/EventCalender';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = () => {
      fetch('/api/events')
        .then(res => res.json())
        .then(data => setEvents(data))
        .catch(err => console.log(err))
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Training Calender</h1>
      <div>
        <EventsCalender events={events} />
      </div>
    </div>
  );
}

export default CalendarPage;