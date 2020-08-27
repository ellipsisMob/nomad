import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';
import './EventCalender.css';

const localizer = momentLocalizer(moment);

const EventCalendar = props => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parsedEvents = props.events.map(event => {
      const dateAndTime = moment(event.data.date).format();

      return {
        title: event.data.title,
        start: new Date(
          moment(dateAndTime).year(),
          moment(dateAndTime).month(),
          moment(dateAndTime).date(),
          moment(dateAndTime).hour(),
          moment(dateAndTime).minute(), 0,
        ),
        end: new Date(
          moment(dateAndTime).year(),
          moment(dateAndTime).month(),
          moment(dateAndTime).date(),
          moment(dateAndTime).hour(),
          moment(dateAndTime).minute() + event.data.duration, 0,
        ),
      };
    });

    setEvents(parsedEvents);
    setLoading(false);
  }, [props]);

  const { eventAdded, setEventAdded } = props;
  return (
    <>
      {loading
        ? <h1>Loading...</h1>
        : (
          <div className="calenderContainer">
            <Calendar
              className="eventCalender"
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end" />
            <EventModal eventAdded={eventAdded} setEventAdded={setEventAdded} />
          </div>
        )}
    </>
  );
};

export default EventCalendar;
