import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import Favourite from './pages/favourites'
import MovieDetails from './pages/MovieDetails'
import Navbar from "./components/Navbar";
import { MovieProvider } from './contexts/movieContex'

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favourites' element={<Favourite />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
