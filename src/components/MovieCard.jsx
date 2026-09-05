import '../css/MovieCard.css';
import FavouriteButton from './FavouriteButton';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    const year = movie.release_date?.split('-')[0] || 'N/A';
    const title = movie.title || 'Untitled';

    return (
        <div className="movie-card">
            <div className="movie-poster">
                {posterUrl ? (
                    <img src={posterUrl} alt={title} loading="lazy" />
                ) : (
                    <div className="movie-poster-fallback">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                            <path d="M7 2v20" />
                            <path d="M17 2v20" />
                            <path d="M2 12h20" />
                            <path d="M2 7h5" />
                            <path d="M2 17h5" />
                            <path d="M17 17h5" />
                            <path d="M17 7h5" />
                        </svg>
                        <span>No Poster</span>
                    </div>
                )}
                <div className="movie-overlay">
                    <FavouriteButton movie={movie} />
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title" title={title}>{title}</h3>
                <p className="movie-year">{year}</p>
                <Link to={`/movie/${movie.id}`} className="movie-details-link">
                    View Details
                </Link>
            </div>
        </div>
    );
}
