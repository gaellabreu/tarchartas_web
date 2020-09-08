import React, { useState } from 'react'
import EventItem from './EventItem'
import { Button, Row, Placeholder, Grid } from 'rsuite'
import { useEffect } from 'react'
import API from '../API'
import AddOrCreateEvent from './AddOrCreateEvent'

const { Paragraph } = Placeholder

export default () => {

    const [events, setEvents] = useState([])
    const [showAddOrCreate, setShowAddOrCreate] = useState(false)
    const [event, setEvent] = useState()

    const toggleAddOrCreate = () => setShowAddOrCreate(!showAddOrCreate)

    useEffect(() => {
        fetchEvents()
    }, [])

    useEffect(() => {
        if (!showAddOrCreate && events.length > 0)
            fetchEvents()
    }, [showAddOrCreate])

    const fetchEvents = () => {
        API.post('event/filter', "{}")
            .then(response => setEvents([...response.data]))
    }

    return <div style={{ margin: '1%' }}>
        <Row>
            <Button
                style={{ marginBottom: '1%', width: '15%' }}
                appearance={'ghost'}
                onClick={() => {
                    setEvent({})
                    toggleAddOrCreate()
                }}>Nuevo evento</Button>
        </Row>
        {!events.length && <>
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
            <Paragraph rows={3} graph={'image'} active />
        </>}

        {events.map(event => <div onClick={() => {
            setEvent({ ...event })
            toggleAddOrCreate()
        }} key={event.id} className={'box-shadow'}>
            <EventItem {...event} />
        </div>)}

        <AddOrCreateEvent event={event} show={showAddOrCreate} close={toggleAddOrCreate} />
    </div>
}