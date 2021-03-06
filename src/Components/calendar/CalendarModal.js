import React, { useEffect, useState } from 'react';
import '../../styles/modal.css';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'; 
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import {uiCloseModal } from '../../redux/actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../redux/actions/events';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }    
};
Modal.setAppElement('#root');
 
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const  {modalOpen}  = useSelector(state => state.ui);
    const  {activeEvent}  = useSelector(state => state.calendar);
    const [ dateStart, setDateStart ] = useState(  now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState(true);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initEvent)

    const {notes, title, start, end} = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]:target.value
        })
    }
    
    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent)
        }else{
            setFormValues(initEvent)
        }
    }, [activeEvent, setFormValues])
    
    

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues( initEvent );
    };
 
    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start:e
        })
    };
 
    const handleEndtDateChange = ( e ) => {
        console.log(e)
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end:e
        })
    };
    
    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );
        
        if( momentStart.isSameOrAfter( momentEnd ) ){
           return Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio')
        }

        if(title.trim().length < 2){
            return setTitleValid(false);
        }

        if( activeEvent){
            dispatch(eventUpdated(formValues))
        }else{
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id:'123',
                    name: 'Fernando'   
                }
            }))
        }
        


        setTitleValid(true);
        closeModal();



    }

    const yesterday = moment(dateStart).subtract(1, 'day')
    const valid = ( current ) => {
    return current.isAfter( yesterday );
    };
 
    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {activeEvent?'Editar evento':'Nuevo Evento'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >
 
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker                 
                        inputProps={{
                            style: { width: 250, background: 'black', color: 'white' }
                        }}
                        value={ dateStart }
                        onChange={ handleStartDateChange }
                        dateFormat="DD-MM-YYYY"
                        timeFormat="hh:mm A"
                        closeOnSelect= { true }
                        closeOnClickOutside={ true }
                        
                    />
                </div>
 
                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker          
                        inputProps={{
                            style: { width: 250, background: 'black', color: 'white' }
                        }}
                        value={ dateEnd }
                        onChange={ handleEndtDateChange }
                        dateFormat="DD-MM-YYYY"
                        timeFormat="hh:mm A"
                        closeOnSelect= { true }
                        closeOnClickOutside={ true }
                        isValidDate = {  valid  }
                        minDate={dateStart}
                    />
                </div>
 
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>
 
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>
 
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
 
            </form>
        </Modal>
    )
};