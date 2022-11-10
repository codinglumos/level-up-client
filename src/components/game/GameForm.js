import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes, getUsers, getGames } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
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
        
        getGames()
        .then((gameArray) => {
            setGames(gameArray)
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

      const changeGameState = (evt) => {
        evt.preventDefault()

        const gameToAPI = {
                skill_level: newGame.skillLevel,
                number_of_players: newGame.numberOfPlayers,
                title: newGame.title,
                maker: newGame.maker,
                game_type: newGame.gameTypeId, 
                       
        }
        
        return createGame(gameToAPI)
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

            <button onClick={changeGameState} className="btn btn-primary">
                Submit Game
            </button>
        </form>
    )
}