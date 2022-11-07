import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes, getUsers, getGames } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [game, setGames] = useState([])
   
    const [newGame, setNewGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
        getUsers()
        getGames()
    }, [])

      const changeGameState = (evt) => {
        evt.preventDefault()

        const gameToAPI = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                skillLevel: game.skillLevel,
                numberOfPlayers: game.numberOfPlayers,
                title: game.title,
                maker: game.maker,
                gameTypeId: game.gameTypeId
            })
        }

        return fetch("http://localhost:8000/games", gameToAPI)
            .then(() => {
               navigate("/games")
            })
    }
        

    return (
        <form className="gameForm">
            <h2 className="gameForm__title"><button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/games/new" })
    }}
>Register New Game</button></h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={newGame.title}
                        onChange={
                            (evt) => {
                            const copy = structuredClone(game)
                            copy.title = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={newGame.skillLevel}
                        onChange={(evt) => {
                            const copy = structuredClone(game)
                            copy.skillLevel = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="players">Number of Players: </label>
                    <input type="number" name="players" required autoFocus className="form-control"
                        value={newGame.numberOfPlayers}
                        onChange={(evt) => {
                            const copy = structuredClone(game)
                            copy.numberOfPlayers = evt.target.value
                            setNewGame(copy)
                        }}
                    />
                </div>

            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: newGame.maker,
                        title: newGame.title,
                        number_of_players: parseInt(newGame.numberOfPlayers),
                        skill_level: parseInt(newGame.skillLevel),
                        game_type: parseInt(newGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}