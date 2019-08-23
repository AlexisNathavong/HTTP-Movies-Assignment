import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

import axios from 'axios';

//Component
import UpdateForm from './Movies/UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data ))
      .catch(err => console.log(err.response));
  })
  // const addToMovieList = movie => {
  //   setMovieList([...movieList, movie]);
  // };

  const deleteMovie = id => {
    const tempMovies = movieList.filter(movie => movie.id !== id) 
    setMovieList(tempMovies);
  }


  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" 
      render={props => {
        return <MovieList {...props} movieList={movieList} />
      }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>;
        }}
      />

     
      <Route 
      path="/update-movie/:id"
      render={props => {
       return <UpdateForm {...props} updateMovieList={setMovieList} movieList={movieList}/>
      }}
      />
    </>
  );
};

export default App;
