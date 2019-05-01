import React from 'react';

const FilmsList = ( {filmsColors, film, index, ...props  }) => {
    return (
        <div 
            style={{backgroundColor:filmsColors[index].color}}
            draggable 
            className="conf-step__movie" 
            onDragStart={(event) => this.dragStart(event, film, 'film')}
        >
            {props.children}
            <img className="conf-step__movie-poster" alt={film.poster} src={require(`../../../images/client/${film.poster}`)}/>
            <h3 className="conf-step__movie-title">{film.title}</h3>
            <p className="conf-step__movie-duration">{film.duration} Минут</p>
        </div>
    );
};

export default FilmsList;