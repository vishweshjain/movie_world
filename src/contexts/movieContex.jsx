import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        const storedfavs = localStorage.getItem("favorites")

        if (storedfavs) {
            setFavourites(JSON.parse(storedfavs))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favourites))
    }, [favourites])

    const addTOFavourite = (movie) => {
        setFavourites((prev) => [...prev, movie])
    }

    const removeFromFavourite = (movieId) => {
        setFavourites((prev) => prev.filter((fav) => fav.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some((fav) => fav.id === movieId)
    }

    const value = { favourites, addTOFavourite, removeFromFavourite, isFavourite }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

// children is reserved prop