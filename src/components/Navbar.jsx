import { Link } from "react-router-dom";
import '../css/Navbar.css'

export default function Navbar() {
    return <nav className="navbar">
        <div className="navbar-inner">
            <Link to='/' className="navbar-brand">
                <svg className="navbar-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <path d="M7 2v20" />
                    <path d="M17 2v20" />
                    <path d="M2 12h20" />
                    <path d="M2 7h5" />
                    <path d="M2 17h5" />
                    <path d="M17 17h5" />
                    <path d="M17 7h5" />
                </svg>
                <span>MovieWorld</span>
            </Link>
            <div className="navbar-links">
                <Link to='/' className="nav-link">Home</Link>
                <Link to='/favourites' className="nav-link">Favourites</Link>
            </div>
        </div>
    </nav>
}
