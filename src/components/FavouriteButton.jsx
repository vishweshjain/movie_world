import { useMovieContext } from '../contexts/movieContex';
import '../css/FavouriteButton.css';

export default function FavouriteButton({ movie }) {
    const { isFavourite, addTOFavourite, removeFromFavourite } = useMovieContext();
    const favourite = isFavourite(movie.id);

    function handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favourite) {
            removeFromFavourite(movie.id);
        } else {
            addTOFavourite(movie);
        }
    }

    return (
        <button
            className={`fav-btn ${favourite ? 'active' : ''}`}
            onClick={handleToggle}
            aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
            title={favourite ? 'Remove from favourites' : 'Add to favourites'}
        >
            <svg viewBox="0 0 24 24" fill={favourite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </button>
    );
}
