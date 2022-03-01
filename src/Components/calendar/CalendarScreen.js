import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import {uiOpenModal } from '../../redux/actions/ui';
import {  eventSetActive } from '../../redux/actions/events';
import { AddNewFab } from '../ui/AddNewFab';



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
  
  const dispatch = useDispatch();
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

  const onDoubleClick = () => {
      dispatch(uiOpenModal());
  }
  
  const onSelect = (e) => {
    
    dispatch(eventSetActive(e))
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
      <CalendarModal />
      <AddNewFab />
    </div>
  )
}
