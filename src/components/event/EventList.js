import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getEvents, getGames, deleteEvent } from "../../managers/EventManager.js"

export const EventList = () => {
    const [ events, setEvents ] = useState([])
    const [ games, setGames ] = useState([])
    const [ users, setUsers ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(eventArray => setEvents(eventArray))
    }, [])

    useEffect(() => {
        getGames().then(gamesArray => setGames(gamesArray))
    }, [])


    return (
        <article className="events">
                <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        {/* <div className="event__description">Let's play {event?.game?.title} organized by {event?.organizer?.username}</div> */}
                        <div className="event__info">Event Details: {event.description}.</div>
                        <div className="event__info">Date: {event.date} at {event.time}</div>
                        <button className="update-button" onClick={() => navigate(`/events/${event.id}/edit`)}>Update Event</button>
                    <button className="delete-button" onClick={() => deleteEvent(event.id).then(() => {window.location.reload()})}>Delete Event</button>

                    </section>
                })
            }
        </article>
    )
}