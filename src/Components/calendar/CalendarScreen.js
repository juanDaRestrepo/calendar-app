import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';


const localizer = momentLocalizer(moment);

const events = [{
  title: 'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el pastel',
  user: {
    _id: '123',
    name: 'Daniel'
  }
}]

export const CalendarScreen = () => {
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundcolor: '#367cf7',
      boderRadius: '0px',
      opacity: 0.8,
      display: 'block'
    }

    return {style}
  }

  const onDoubleClick = (e) => {
    console.log(e)
  }

  const onSelect = (e) => {
    console.log(e)
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={ onDoubleClick}
        onSelectEvent= {onSelect}
        onView= {onViewChange}
        view = {lastView}

        components={{
          event: CalendarEvent
        }}
      />
    </div>
  )
}
