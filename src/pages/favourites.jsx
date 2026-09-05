import { useMovieContext } from '../contexts/movieContex'
import MovieGrid from '../components/MovieGrid'
import MovieCard from '../components/MovieCard'
import EmptyState from '../components/EmptyState'
import '../css/Favourite.css'

export default function Favourite() {
    const { favourites } = useMovieContext()

    if (favourites.length === 0) {
        return (
            <div className='favourites'>
                <h2 className='favourites-title'>Your Favourite List</h2>
                <EmptyState
                    icon="❤️"
                    title="No favourites yet"
                    message="Start adding movies to your favourites and they will appear here."
                />
            </div>
        )
    }

    return (
        <div className='favourites'>
            <h2 className='favourites-title'>Your Favourite List</h2>
            <MovieGrid>
                {favourites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </MovieGrid>
        </div>
    )
}
