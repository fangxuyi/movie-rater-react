import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from "react-cookie";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "./hooks/useFetch"

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditMovie] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mr-token']);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data])

  useEffect( () => {
    console.log(token);
    if(!token['mr-token']) window.location.href = '/';
}, [token])

  const movieClicked = movie => {
    setSelectedMovie(movie);
    setEditMovie(null);
  }
  const editClicked = movie => {
    setEditMovie(movie);
    setSelectedMovie(null);
  }
  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies);
    setEditMovie(null);
    setSelectedMovie(null);
  }
  const newMovie = () => {
    setEditMovie({title: "", description: ""});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie]
    setMovies(newMovies);
    setEditMovie(null);
    setSelectedMovie(null);
  }
  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id)
    setMovies(newMovies);
    setEditMovie(null);
    setSelectedMovie(null);
  }
  const logoutUser = () => {
    removeToken(['mr-token']);
  }

  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error Loading</h1>
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="h1">
          <FontAwesomeIcon icon={faFilm}/>
          <span>movie rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className='layout'>
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={movieClicked} 
            editClicked={editClicked}
            removeClicked={removeClicked}/>
          <button onClick={newMovie}>New Movie</button>
        </div>
          <MovieDetails movie={selectedMovie} updateMovie={movieClicked}/>
          {editedMovie ? <MovieForm movie={editedMovie} updateMovie={updatedMovie} movieCreated={movieCreated}/> : null}
          
        </div>
    </div>
  );
}

export default App;
