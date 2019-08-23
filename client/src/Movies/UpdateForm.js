import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
       fetchMovie(props.match.params.id); 
    }, [props.match.params.id]);

    const changeHandler = event => {

        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                // setMovie(initialMovie);
                // props.updateMovies(res.data);
                // props.history.push('/movie-list');
                const index = props.movieList.findIndex(film => film.id === movie.id)

                props.movieList[index] = movie;
                props.updateMovieList(props.movieList);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    const fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.log(err.response));
      };

    return (
        <div>
            <h2>Update Movie</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />

                <div className="baseline">
                    <input 
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        placeholder="director"
                        value={movie.director}
                    />
                </div>

                <div className="baseline">
                    <input 
                        type="number"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="metascore"
                        value={movie.metascore}
                    />
                </div>

                <div className="baseline">
                    <input 
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="stars"
                        value={movie.stars}
                    />
                </div>

                <button class="form-btn">Update</button>
            </form>
        </div>
    ) 
}

export default UpdateForm;