import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, getGameTypes, getEvents, getGames, getEventById, updateEvent } from '../../managers/EventManager.js'


export const UpdateEvent = () => {
    const navigate = useNavigate()
    const {eventId} = useParams()
    const [events, setEvents] = useState([])
    const [games, setGames] = useState([])

    const [newEvent, setNewEvent] = useState({
        game: 0,
        description: "",
    })

    useEffect(() => {
        
        getEventById()
        .then((eventId) => {
            setNewEvent(eventId)
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

      const updatedEvent = (evt) => {
        evt.preventDefault()

        const editedEvent = {
                game: newEvent.game,
                description: newEvent.description       
        }
        return updateEvent(editedEvent)
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
            <button onClick={updatedEvent} className="btn btn-primary">
                Update Event
            </button>
        </form>
    )
}