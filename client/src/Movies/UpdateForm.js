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
    }, []);

    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'title') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [event.target.name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put('https://localhost:3333/update-movie/${movie.id}', movie)
            .then(res => {
                console.log(res);
                setMovie(initialMovie);
                props.updateMovies(res.data);
                props.history.push('/movie-list');
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