import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/movieContex'

export default function MovieCard({ movie }) {

    const { isFavourite, addTOFavourite, removeFromFavourite } = useMovieContext()
    const favourite = isFavourite(movie.id)

    function onFav(e) {
        e.preventDefault();
        if (favourite) {
            removeFromFavourite(movie.id);
        } else {
            addTOFavourite(movie);
        }
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-overlay">
            <button className={`fav-btn ${favourite ? 'active' : ''}`} onClick={onFav}>
                {favourite ? '❤️' : '🤍'}
            </button>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split('-')[0]}</p>
            {/* <p>{movie.rating}</p> */}
            {/* <p>{movie.year}</p> */}
            {/* <p>{movie.rating}</p> */}
        </div>
    </div>
}