import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

//Component
import UpdateForm from './Movies/UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movieList, setMovieList] = useState([]);

  const addToMovieList = movie => {
    setMovieList([...movieList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />

      <MovieList list={movieList} />
      <Route 
      path="/update-movie/:id"
      render={props => {
       return <UpdateForm {...props} addToMovieList={addToMovieList} />
      }}
      />
    </>
  );
};

export default App;
