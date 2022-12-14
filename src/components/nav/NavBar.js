import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="navbar__link" to="/games">Game List</Link>            </li>
        
            {/* <li className="navbar__item">
            <Link to="/gametypes" className="navbar-item">Game Type List</Link>
            </li> */}
            <li className="navbar__item">
            <Link to="/events" className="navbar-item">Event List</Link>
            </li>
            {/* <li className="navbar__item">
            <Link to="/createevents" className="navbar-item">Event Form</Link>
            </li> */}
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
