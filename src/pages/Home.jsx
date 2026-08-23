import MovieCard from "../components/MovieCrad"
import { useEffect, useState } from "react";
import '../css/Home.css'

import { searchMovies, getPopularMovies } from "../services/api";
export default function Home() {

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovie = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            }
            catch (err) {
                console.log(err)
                setError("Failed to load movies")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovie();
    }, [])


    async function handleSearch(event) {
        event.preventDefault();

        if (!search.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const movies = await searchMovies(search);
            if (movies.length === 0) {
                setError("No movies found")
            }
            else {
                setMovies(movies)
            }
        } catch (err) {
            console.log(err)
            setError("Failed to search movies")
        } finally {
            setLoading(false)
        }

        // setSearch("");
    }


    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                className="search-input"
                placeholder="Seacrh for movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="search-btn">Search</button>
        </form>
        <h2 className="title">Current Trending Movies</h2>


        {error && <div className="error-message">{error}</div>}

        {loading ? (<div className="loading">Loading...</div>)
            : (<div className="movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(search.toLowerCase()) &&
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>)
        };


    </div>
}