import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent, getGameTypes, getEvents, getGames, updateEvent } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [games, setGames] = useState([])
   // const [users, setUsers] = useState([])
   
    const [newEvent, setNewEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: "", 
        organizer: 0,
    })

    useEffect(() => {
        
        getEvents()
        .then((eventArray) => {
            setEvents(eventArray)
        })
            
    }, []
    )

    useEffect(() => {
        
        getGames()
        .then((gameArray) => {
            setGames(gameArray)
        })
            
    }, []
    )

      const changeEventState = (evt) => {
        evt.preventDefault()

        const eventToAPI = {
                game: newEvent.game,
                description: newEvent.description,
                date: newEvent.date,
                time: newEvent.time, 
                organizer: newEvent.organizer        
        }
        return createEvent(eventToAPI)
            .then(() => {
               navigate("/events")
            })
    }
        

    return (
        <form className="eventForm">
            <h2 className="eventForm__description"></h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={
                            (evt) => {
                            const copy = structuredClone(newEvent)
                            copy.description = evt.target.value
                            setNewEvent(copy)
                        }}
                    />
                </div>
                </fieldset>
                <fieldset>
                <div className="select">
                    <label className="games" htmlFor="games">Game:</label>
                    <select  placeholder="Choose Game" className="form-control" id="games" value={newEvent.game}
                        onChange={(evt) => {
                        const copy = structuredClone(newEvent)
                        copy.game = evt.target.value
                        setNewEvent(copy)
                        }}>
                    <option value={games}></option>
                            {
                     games.map(game => {
                     return <option className="select option" value={game.id} key={`game--${game.id}`}>{game.title}</option>
                        })
                    }
                </select>
                </div>
            </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="number" name="organizer" required autoFocus className="form-control"
                        value={newEvent.organizer}
                        onChange={(evt) => {
                            const copy = structuredClone(newEvent)
                            copy.organizer = evt.target.value
                            setNewEvent(copy)
                        }}
                    />
                </div>
                </fieldset>

            <button onClick={changeEventState} className="btn btn-primary">
                Submit Event
            </button>
        </form>
    )
}