import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../services/api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import FavouriteButton from "../components/FavouriteButton";
import "../css/MovieDetails.css";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadDetails() {
            setLoading(true);
            setError(null);
            setMovie(null);
            setCast([]);

            try {
                const [details, credits] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id)
                ]);

                if (isMounted) {
                    setMovie(details);
                    setCast(credits.slice(0, 10));
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                    setError('Failed to load movie details. Please try again later.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadDetails();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return <LoadingState message="Loading movie details..." />;
    }

    if (error) {
        return (
            <div className="movie-details-page">
                <div className="movie-details-header">
                    <Link to="/" className="back-button">
                        ← Back
                    </Link>
                </div>
                <div className="movie-details-error">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="movie-details-page">
                <div className="movie-details-header">
                    <Link to="/" className="back-button">
                        ← Back
                    </Link>
                </div>
                <EmptyState
                    icon="🎬"
                    title="Movie not found"
                    message="We couldn't find the movie you're looking for."
                />
            </div>
        );
    }

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    const year = movie.release_date?.split('-')[0] || 'N/A';
    const rating = movie.vote_average != null ? movie.vote_average.toFixed(1) : 'N/A';
    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : null;

    return (
        <div className="movie-details-page">
            <div className="movie-details-header">
                <Link to="/" className="back-button">
                    ← Back
                </Link>
            </div>

            <div className="movie-details-content">
                <div className="movie-details-poster">
                    {posterUrl ? (
                        <img src={posterUrl} alt={movie.title} />
                    ) : (
                        <div className="movie-poster-fallback-large">
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
                </div>

                <div className="movie-details-info">
                    <div className="movie-details-top">
                        <h1 className="movie-details-title">{movie.title || 'Untitled'}</h1>
                        <FavouriteButton movie={movie} />
                    </div>

                    <div className="movie-details-meta">
                        <span className="movie-details-year">{year}</span>
                        {runtime && <span className="movie-details-runtime">{runtime}</span>}
                        <span className="movie-details-rating">⭐ {rating}</span>
                    </div>

                    <div className="movie-details-genres">
                        {movie.genres?.map((genre) => (
                            <span key={genre.id} className="genre-badge">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {movie.overview && (
                        <div className="movie-details-overview">
                            <h3>Story</h3>
                            <p>{movie.overview}</p>
                        </div>
                    )}

                    {cast.length > 0 && (
                        <div className="movie-details-cast">
                            <h3>Cast</h3>
                            <div className="cast-list">
                                {cast.map((actor) => (
                                    <div key={actor.id} className="cast-item">
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                alt={actor.name}
                                                className="cast-photo"
                                            />
                                        ) : (
                                            <div className="cast-photo-fallback">
                                                {actor.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                        <span className="cast-name">{actor.name}</span>
                                        <span className="cast-character">{actor.character}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {movie.tagline && (
                        <div className="movie-details-tagline">
                            <em>"{movie.tagline}"</em>
                        </div>
                    )}

                    <div className="movie-details-extra">
                        {movie.status && (
                            <div className="extra-item">
                                <span className="extra-label">Status</span>
                                <span className="extra-value">{movie.status}</span>
                            </div>
                        )}
                        {movie.budget > 0 && (
                            <div className="extra-item">
                                <span className="extra-label">Budget</span>
                                <span className="extra-value">
                                    ${movie.budget.toLocaleString()}
                                </span>
                            </div>
                        )}
                        {movie.revenue > 0 && (
                            <div className="extra-item">
                                <span className="extra-label">Revenue</span>
                                <span className="extra-value">
                                    ${movie.revenue.toLocaleString()}
                                </span>
                            </div>
                        )}
                        {movie.production_companies?.length > 0 && (
                            <div className="extra-item">
                                <span className="extra-label">Production</span>
                                <span className="extra-value">
                                    {movie.production_companies.map((c) => c.name).join(', ')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
