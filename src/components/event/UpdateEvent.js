import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const UpdateEvent = () => {
    const navigate = useNavigate()
    const [eventInfo, updatedEventInfo] = useState ({
        game: "",
        description: "",
        date: "",
        time: "",     
    })
    
    const [updateInfoId, setUpdateInfoId] = useState(0)

    const [game, setGames] = useState([])
    const [event, setEvents] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/games`)
        .then(response => response.json())
        .then((gameArray) => {
            setGames(gameArray)
        })
    },
    [])

    useEffect(() => {
        fetch(`http://localhost:8088/events`)
        .then(response => response.json())
        .then((eventArray) => {
            setEvents(eventArray)
        })
    },
    [])

const updatedEvent = (event, game) => {
    event.preventDefault()

    const eventInfoToSendToAPI = {
        game: game.title,
        description: event.description,
        date: event.date,
        time: event.time
    } 
  
        return fetch(`http://localhost:8088/events/${event}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventInfoToSendToAPI)
        })
        .then(response => response.json())
        .then(() =>{
            navigate("/events")    
        })
    
 
} 
    return <form className="eventForm">
    <h2 className="eventForm__game">Register New Event</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="game">Game: </label>
            <input type="text" name="game" required autoFocus className="form-control"
                value={eventInfo.game}
                onChange={(evt) => {
                    const copy = structuredClone(event)
                    copy.game = evt.target.value
                    updatedEventInfo(copy)
                }}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" required autoFocus className="form-control"
                value={eventInfo.description}
                onChange={(evt) => {
                    const copy = structuredClone(event)
                    copy.description = evt.target.value
                    updatedEventInfo(copy)
                }}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="organizer">Organizer: </label>
            <input type="text" name="organizer" required autoFocus className="form-control"
                value={eventInfo.organizer}
                onChange={(evt) => {
                    const copy = structuredClone(event)
                    copy.organizer = evt.target.value
                    updatedEventInfo(copy)
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
            setEventInfo(copy)}}/>
        </div>
    </fieldset> */}
    {/* TODO: create the rest of the input fields */}

    <button type="submit"
        onClick={evt => {
            // Prevent form from being submitted
            evt.preventDefault()

            const game = {
                title: eventInfo.title,
                description: eventInfo.description,
                organizer: parseInt(eventInfo.organizer),
                date: parseInt(eventInfo.date),
                time: parseInt(eventInfo.time)
            }

            // Send POST request to your API
            updatedEvent(event)
                .then(() => navigate("/events"))
        }}
        className="btn btn-primary">Update Event</button>
</form>

}