import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "../../managers/GameManager.js"
import { useNavigate } from 'react-router-dom'

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
        >Register New Game</button>

            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        {/* <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div> */}
                    <button className="update-button" onClick={() => navigate(`/games/${game.id}/edit`)}>Update Game</button>
                    <button className="delete-button" onClick={() => deleteGame() .then(navigate(`/games`))}>Delete Game</button>

                    </section>
                })
            }
        </article>
    )
}