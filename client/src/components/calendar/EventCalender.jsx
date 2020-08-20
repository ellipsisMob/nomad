import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const EventCalendar = props => {
  const [ events, setEvents ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const parsedEvents = props.events.map(event => {
      const dateAndTime = moment(event.data.start).format();

      return {
        'title': event.data.title,
        'start': new Date(
          moment(dateAndTime).year(),
          moment(dateAndTime).month(),
          moment(dateAndTime).date(),
          moment(dateAndTime).hour(),
          moment(dateAndTime).minute(),
          0),
        'end': new Date(
          moment(dateAndTime).year(),
          moment(dateAndTime).month(),
          moment(dateAndTime).date(),
          moment(dateAndTime).hour(),
          moment(dateAndTime).minute() + event.data.duration,
        0),
      }
    });

    setEvents(parsedEvents);
    setLoading(false);

  }, [props]);

  return (
    <div>
      {loading
        ?<h1>Loading...</h1>
        :<Calendar
          className='eventCalender'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 570, margin: 20 }}
        />
      }
    </div>
  )
}

export default EventCalendar;
