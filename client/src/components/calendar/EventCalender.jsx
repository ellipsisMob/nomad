import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './__MOCKS__/events';

const localizer = momentLocalizer(moment);

const EventCalendar = props => {
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
