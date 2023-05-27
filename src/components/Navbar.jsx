import { NavLink } from 'react-router-dom';
import NavbarCSS from "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>HomeBiZ</h1>
            <div className="links">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Sign Up</NavLink>
            </div>
        </nav>
      );
}

export default Navbar;