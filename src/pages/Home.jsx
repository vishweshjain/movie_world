import { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const requestIdRef = useRef(0);

    const loadPopularMovies = useCallback(async () => {
        requestIdRef.current += 1;
        const currentRequestId = requestIdRef.current;

        setLoading(true);
        setError(null);
        setIsSearching(false);
        setSearchQuery('');

        try {
            const popularMovies = await getPopularMovies();
            if (currentRequestId === requestIdRef.current) {
                setMovies(popularMovies);
            }
        } catch (err) {
            if (currentRequestId === requestIdRef.current) {
                console.error(err);
                setError('Failed to load trending movies. Please try again later.');
            }
        } finally {
            if (currentRequestId === requestIdRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPopularMovies();
    }, [loadPopularMovies]);

    const handleSearch = useCallback(async (query) => {
        const trimmed = query.trim();

        if (!trimmed) {
            loadPopularMovies();
            return;
        }

        setSearchQuery(trimmed);
        requestIdRef.current += 1;
        const currentRequestId = requestIdRef.current;

        setIsSearching(true);
        setError(null);
        setLoading(true);

        try {
            const results = await searchMovies(trimmed);
            if (currentRequestId === requestIdRef.current) {
                setMovies(results);
                if (results.length === 0) {
                    setError('no-results');
                }
            }
        } catch (err) {
            if (currentRequestId === requestIdRef.current) {
                console.error(err);
                setError('Failed to search movies. Please try again later.');
            }
        } finally {
            if (currentRequestId === requestIdRef.current) {
                setLoading(false);
                setIsSearching(false);
            }
        }
    }, [loadPopularMovies]);

    const isEmpty = !loading && movies.length === 0 && !error;
    const isNoResults = error === 'no-results';

    return (
        <div className="home">
            <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

            {loading ? (
                <LoadingState message={isSearching ? 'Searching...' : 'Loading trending movies...'} />
            ) : isNoResults ? (
                <EmptyState
                    icon="🎬"
                    title="No movies found"
                    message={`We couldn't find any movies matching "${searchQuery}". Try a different search term.`}
                />
            ) : error ? (
                <div className="home-error">
                    <span className="home-error-icon">⚠️</span>
                    <p>{error}</p>
                    <button className="home-error-btn" onClick={loadPopularMovies}>
                        Try Again
                    </button>
                </div>
            ) : (
                <MovieGrid
                    title={isSearching ? `Results for "${searchQuery}"` : 'Trending Now'}
                    isEmpty={isEmpty}
                    emptyMessage={`No movies found for "${searchQuery}"`}
                    emptyIcon="🔍"
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </MovieGrid>
            )}
        </div>
    );
}
