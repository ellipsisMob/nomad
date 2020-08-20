import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = Calendar.momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default MyCalendar;

const events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2020, 8, 16),
    'end': new Date(2020, 8, 16)
  },
  {
    'title': 'Long Event',
    'start': new Date(2020, 9, 15),
    'end': new Date(2020, 8, 15)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some PARTY!!',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2020, 8, 16),
    'end': new Date(2020, 8, 16),
    desc: 'Big conference for important people'
  },
  {
    'title': 'YEAAAH!',
    'start': new Date(2020, 6, 19, 7, 0, 0),
    'end': new Date(2020, 6, 20, 10, 30, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  ,
  {
    'title': 'Birthday Party',
    'start': new Date(2020, 7, 20, 7, 0, 0),
    'end': new Date(2020, 7, 20, 10, 30, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Birthday Party 2',
    'start': new Date(2020, 8, 20, 7, 0, 0),
    'end': new Date(2020, 8, 20, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 3',
    'start': new Date(2020, 8, 20, 7, 0, 0),
    'end': new Date(2020, 8, 20, 10, 30, 0)
  },
];
