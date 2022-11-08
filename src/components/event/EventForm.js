//import { createEvent } from "@testing-library/react"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getEvents } from "../../managers/EventManager.js"
import { createEvent, getGameTypes, getUsers, getGames} from '../../managers/EventManager.js'
//import DatePicker from "react-datepicker"


export const EventForm = () => {
    const navigate = useNavigate()
    const [event, setEvents] = useState([])
    const [gameTypes, setGameTypes] = useState([])
    const [users, setUsers] = useState([])
    const [game, setGames] = useState([])
    //const [date, setDate] = useState(new Date())

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [newEvent, setNewEvent] = useState({
        game: "",
        description: "",
        date: "",
        time: "",
        organizer: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
    getEvents()
    .then((eventArray) => {
        setEvents(eventArray)
    })
    }, [])


    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames()
        .then((gameArray) => {
            setGames(gameArray)
        })
    }, [])
    const changeEventState = (evt) => {
        // TODO: Complete the onChange function
        const eventToAPI = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                game: game.title,
                description: event.description,
                organizer: event.organizer,
                date: event.date,
                time: event.time
            })
        }

        return fetch("http://localhost:8000/events", eventToAPI)
            .then(() => {
               navigate("/events")
            })
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__game">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <input type="text" name="game" required autoFocus className="form-control"
                        value={newEvent.game}
                        onChange={(evt) => {
                            const copy = structuredClone(event)
                            copy.game = evt.target.value
                            setNewEvent(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={(evt) => {
                            const copy = structuredClone(event)
                            copy.description = evt.target.value
                            setNewEvent(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="text" name="organizer" required autoFocus className="form-control"
                        value={newEvent.organizer}
                        onChange={(evt) => {
                            const copy = structuredClone(event)
                            copy.organizer = evt.target.value
                            setNewEvent(copy)
                        }}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="select">
                    <label className="date" htmlFor="date">Date:</label>
                    <DatePicker 
                    className="form-control" selected={date} onChange={(date) => {
                    const copy = structuredClone(event)
                    copy.date = date
                    setDate(date)
                    setNewEvent(copy)}}/>
                </div>
            </fieldset> */}
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: newEvent.title,
                        description: newEvent.description,
                        organizer: parseInt(newEvent.organizer),
                        date: parseInt(newEvent.date),
                        time: parseInt(newEvent.time)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}