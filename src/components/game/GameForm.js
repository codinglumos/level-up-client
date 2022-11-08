import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes, getUsers, getGames } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    // const [gameTypes, setGameTypes] = useState([])
    // const [users, setUsers] = useState([])
   
    const [newGame, setNewGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        getGames()
        .then((gameArray) => {
            setGames(gameArray)
        })
            
    }, []
    )

      const changeGameState = (evt) => {
        evt.preventDefault()

        const gameToAPI = {
                skillLevel: newGame.skillLevel,
                numberOfPlayers: newGame.numberOfPlayers,
                title: newGame.title,
                maker: newGame.maker,
                gameTypeId: newGame.gameTypeId        
        }
        return createGame(gameToAPI)
        // return fetch("http://localhost:8000/games", {
        //     method:"POST",
        //     headers: {
        //         ,
        //         "Authorization": `Token ${localStorage.getItem("lu_token")}`

        //     },
        //     body: JSON.stringify(gameToAPI)
        // })
            .then(response => response.json())
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