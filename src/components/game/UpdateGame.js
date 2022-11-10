import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateEvent } from "../../managers/EventManager.js"
import { createGame, getGameTypes, getUsers, getGames, getGameById, updateGame } from '../../managers/GameManager.js'


export const UpdateGame = () => {
    const navigate = useNavigate()
    const {gameId} = useParams()
    const [gameTypes, setGameTypes] = useState([])
    //const [users, setUsers] = useState([])
   
    const [newGame, setNewGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "", 
        gameTypeId: 0
    })

    useEffect(() => {
        getGameById(gameId)
        .then(() => {
            setNewGame({id:gameId})
        })
            
    }, []
    )

    useEffect(() => {
        
        getGameTypes()
        .then((gametypeArray) => {
            setGameTypes(gametypeArray)
        })
            
    }, []
    )

      const updatedGame = (evt) => {
        evt.preventDefault()

        const editedGame = {
                skill_level: newGame.skillLevel,
                number_of_players: newGame.numberOfPlayers,
                title: newGame.title,
                maker: newGame.maker,
                id:newGame.id,
                game_type: newGame.gameTypeId       
        }
        return updateGame(editedGame)
            .then(() => {
               navigate("/games")
            })
    }
        

    return (
        <form className="gameForm">
            <h2 className="gameForm__title"></h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={newGame.title}
                        onChange={
                            (evt) => {
                            const copy = structuredClone(newGame)
                            copy.title = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={newGame.maker}
                        onChange={
                            (evt) => {
                            const copy = structuredClone(newGame)
                            copy.maker = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={newGame.skillLevel}
                        onChange={(evt) => {
                            const copy = structuredClone(newGame)
                            copy.skillLevel = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>
                </fieldset>
                <fieldset>
                <div className="select">
                    <label className="gametypes" htmlFor="gametypes">Game Type:</label>
                    <select  placeholder="Choose Game Type" className="form-control" id="gametypes" value={newGame.gameTypeId}
                        onChange={(evt) => {
                        const copy = structuredClone(newGame)
                        copy.gameTypeId = evt.target.value
                        setNewGame(copy)
                        }}>
                    <option value={gameTypes}></option>
                            {
                     gameTypes.map(gametype => {
                     return <option className="select option" value={gametype.id} key={`gametype--${gametype.id}`}>{gametype.label}</option>
                        })
                    }
                </select>
                </div>
            </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Number of Players: </label>
                    <input type="number" name="players" required autoFocus className="form-control"
                        value={newGame.numberOfPlayers}
                        onChange={(evt) => {
                            const copy = structuredClone(newGame)
                            copy.numberOfPlayers = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>

            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button onClick={updatedGame} className="btn btn-primary">
                Update Game
            </button>
        </form>
    )
}