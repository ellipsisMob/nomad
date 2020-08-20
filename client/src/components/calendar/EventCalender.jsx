import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './__MOCKS__/events';

const localizer = momentLocalizer(moment);

const EventCalendar = props => {
  // const [events, setEvents] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const parsedEvents = events.map(event => {
  //   const dateAndTime = moment(event.data.start).format();

  //   return {
  //     'title': event.data.title,
  //     'start': new Date(
  //       moment(dateAndTime).year(),
  //       moment(dateAndTime).month(),
  //       moment(dateAndTime).date(),
  //       moment(dateAndTime).hour(),
  //       moment(dateAndTime).minute(),
  //       0),
  //     'end': new Date(
  //       moment(dateAndTime).year(),
  //       moment(dateAndTime).month(),
  //       moment(dateAndTime).date(),
  //       moment(dateAndTime).hour(),
  //       moment(dateAndTime).minute() + event.duration,
  //     0),
  //   }
  // });

  // const fetchEvents = () => {
  //   setLoading(true);
  //   fetch('/api/events')
  //     .then(res => res.json())
  //     .then(data => setEvents(data))
  //     .then(() => setLoading(false));
  // };

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  useEffect(() => {
    console.log('from useEffect hook', events);
  }, [events]);

  // setTimeout(() => {
  //   setEvents(parsedEvents);
  // }, 2000)

  return (
    <div>
      <Calendar
        className='eventCalender'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 570, margin: 20 }}
      />
    </div>
  )
}

export default EventCalendar;
