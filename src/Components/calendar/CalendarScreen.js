import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../redux/actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';



const localizer = momentLocalizer(moment);



export const CalendarScreen = () => {
  
  const dispatch = useDispatch();
  const {events} = useSelector(state => state.calendar);
  const {activeEvent} = useSelector(state => state.calendar);
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

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
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
        onSelectSlot={ onSelectSlot}
        selectable={ true }
        components={{
          event: CalendarEvent
        }}
      />
      
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  )
}
