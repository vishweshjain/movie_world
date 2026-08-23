import { useState } from 'react'

import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Favourite from './pages/favourites'
import Navbar from "./components/Navbar";
import { MovieProvider } from './contexts/movieContex'


function App() {

  // const movieNumber = 1;


  return (
    <MovieProvider>
      {/* {movieNumber === 1 ? <MovieCard movie={{ title: "Inception", release_date: "2010" }} /> :
        <MovieCard movie={{ title: "The Matrix", release_date: "1999" }} />} */}
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favourites' element={<Favourite />} />
        </Routes>
      </main>
    </MovieProvider>

  )
}

// Component
// function Text({ display }) {
//   return (
//     <div>
//       <p>{display}</p>
//     </div>
//   )
// }

export default App
