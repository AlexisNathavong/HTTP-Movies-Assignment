import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}


const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        fetchMovie(props.match.params.id)
    }, [props.match.params.id])

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        //* This is where the PUT request will be *//
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log('PUT request api', res);
                const index = props.movieList.findIndex(film => film.id === movie.id)

                props.movieList[index] = movie;
                props.updateMovieList(props.movieList);
                props.history.push('/');

            })
            .catch(err => {
                console.log('Error in PUT request', err.response)
            });

    };

    const fetchMovie = id => {
        //* There is where the GET request will be */
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log('GET request', res.data);
                setMovie(res.data);
            })
            .catch(err => {
                console.log('Error in GET request', err.response)
            })
    }

    return (
        <div>
            <h2>Updating Movie</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Add a title'
                    value={movie.title} required
                    onChange={handleChanges}
                />

                <div className='update-form'>
                    <input
                        type='text'
                        name='director'
                        placeholder='Add a director'
                        value={movie.director} required
                        onChange={handleChanges}
                    />
                </div>

                <div className='update-form'>
                    <input
                        type='number'
                        name='metascore'
                        placeholder='Add a number'
                        value={movie.metascore} required
                        onChange={handleChanges}
                    />
                </div>

                <div className='update-form'>
                    <input
                        type='text'
                        name='stars'
                        placeholder='Add stars'
                        value={movie.stars} required
                        onChange={handleChanges}
                    />
                </div>

                <button className='update-btn'>Update</button>

            </form>
        </div>

    )
}

export default UpdateForm;