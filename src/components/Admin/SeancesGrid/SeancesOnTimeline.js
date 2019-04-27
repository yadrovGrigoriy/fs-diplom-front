import React from 'react';
import shortid from 'shortid';

const SeancesOnTimeline = ({ seancesList, hallId, films, dragStart, filmsColors }) => {

    const list = seancesList.filter( seance => parseInt(seance.hall_id) === parseInt(hallId));
    const seancePosition = (start, duration) => {
        const positionStart = start.split(':').reduce( (hour, min) => (hour * 60 + parseInt(min))*0.5);
        const positionEnd = positionStart + duration;
        const width = duration * 0.5 ; 
       
        return {
            positionStart,
            positionEnd,
            width
        }
    }
    return (
        list.map( seance => {
            const film = films.find( film => film.id == seance.film_id );
            if(!film)return null;
            const position = seancePosition(seance.time, film.duration);
            const filmColor = filmsColors.find( item => item.filmId ===  film.id);

            return(
            <div 
                key={shortid.generate()} 
                className="conf-step__seances-movie"
                style={{left:`${position.positionStart}px`, width:`${position.width}px`, backgroundColor:filmColor.color}}                
                draggable
                onDragStart={(event) => dragStart(event, seance, 'seance')}
            >
                <p className="conf-step__seances-movie-title">{film.title }</p>
                <p className="conf-step__seances-movie-start">{seance.time}</p>
            </div>
            )
        })
        
    );
};

export default SeancesOnTimeline;