import React from 'react';

const FilmView = ({ film, ...props }) => {
    return (
        <section className="movie" key={film.id}>
        <div className="movie__info">
            <div className="movie__poster">
                <img className="movie__poster-image" alt="Звёздные войны постер" src={require(`../../../images/client/${film.poster}`)}/>
            </div>
            <div className="movie__description">
                <h2 className="movie__title">{film.title}</h2>
                <p className="movie__synopsis">{film.description}</p>
                <p className="movie__data">
                    <span className="movie__data-duration">{film.duration} мин </span>
                    <span className="movie__data-origin">{film.country}</span>
                </p>
            </div>
        </div> 
        {props.children}
        {/* {  renderHalls(film.id) } */}
        </section>
    );
};

export default FilmView;