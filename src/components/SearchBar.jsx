import { useState, useEffect, useRef, useCallback } from 'react';
import '../css/SearchBar.css';

export default function SearchBar({ onSearch, initialValue = '' }) {
    const [value, setValue] = useState(initialValue);
    const debounceRef = useRef(null);
    const isFirstRender = useRef(true);
    const skipNextDebounceRef = useRef(false);

    const debouncedSearch = useCallback((query) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            onSearch(query.trim());
        }, 400);
    }, [onSearch]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (skipNextDebounceRef.current) {
            skipNextDebounceRef.current = false;
            return;
        }
        debouncedSearch(value);
    }, [value, debouncedSearch]);

    function handleSubmit(e) {
        e.preventDefault();
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        onSearch(value.trim());
    }

    function handleClear() {
        skipNextDebounceRef.current = true;
        setValue('');
        onSearch('');
    }

    function handleChange(e) {
        skipNextDebounceRef.current = false;
        setValue(e.target.value);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies..."
                    value={value}
                    onChange={handleChange}
                    aria-label="Search movies"
                />
                {value && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                )}
            </div>
            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    );
}
