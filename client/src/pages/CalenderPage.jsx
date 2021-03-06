import React, { useEffect, useState } from 'react';
import EventsCalender from '../components/calendar/EventCalender';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [eventAdded, setEventAdded] = useState(0);

  const fetchEvents = () => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  };

  useEffect(() => {
    fetchEvents();
  }, [eventAdded]);

  return <EventsCalender events={events} eventAdded={eventAdded} setEventAdded={setEventAdded} />;
};

export default CalendarPage;
