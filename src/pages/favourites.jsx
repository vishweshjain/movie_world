import '../css/Favourite.css'
import { useMovieContext } from '../contexts/movieContex'
import MovieCard from '../components/MovieCrad'

export default function Favourite() {
    const { favourites } = useMovieContext();

    if (favourites) {
        return (
            <div className='favourites'>
                <h2 className='title'>Your Favourite List</h2>
                <div className="movies-grid">
                    {favourites.map((movie) => (
                        // movie.title.toLowerCase().startsWith(search.toLowerCase()) &&
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        )
    }

    return <div className="fav-empty">
        <h2>No Favourite movie Yet</h2>
        <p> Start adding Movies to your favourites and will appear here </p>
    </div>
}