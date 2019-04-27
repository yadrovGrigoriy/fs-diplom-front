import React from 'react';
import { Link } from 'react-router-dom';
import FilmView from './FilmView';
import shortId from 'shortid';


const Main = ({ films, halls, seances }) => {
   
    const renderSeances = (filmId, hallId) => {
        const filtered = seances.filter(seance => parseInt(seance.film_id) === filmId && parseInt(seance.hall_id) === hallId)
                return filtered.map( seance => (
                    <li className="movie-seances__time-block" key={shortId.generate()}>
                        <Link className="movie-seances__time" to={{ pathname:`/client/hall/${seance.id}`}} >{seance.time}</Link>
                    </li>
                ))
    }   

    const renderHalls = (filmId) => (
        halls.map( hall => {
            if(seances.find(seance =>  parseInt(seance.hall_id) === hall.id && parseInt(seance.film_id) === filmId)){
                return(
                    <div className="movie-seances__hall" key={shortId.generate()}>
                        <h3 className="movie-seances__hall-title">Зал { hall.name.toUpperCase() }</h3>
                        <ul className="movie-seances__list">
                            { renderSeances( filmId, hall.id) }
                        </ul>
                    </div>
                )
            }
        })
    )
    return(
        <main>
            {
                films.map( film => {
                    if(seances.find(seance=> parseInt(seance.film_id) === film.id)){
                        return <FilmView  key={shortId.generate()} film={film}>
                            {renderHalls(film.id)}
                        </FilmView>
                    }
                })
            }
        </main>
    )
    
}

export default Main;