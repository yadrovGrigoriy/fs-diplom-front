import React from 'react';
import shortid from 'shortid'

const HallsWithTimeline = (props) => {
    return (
        <div 
        key={shortid.generate()} 
        className="conf-step__seances-hall"
        
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => props.onDrop(event,props.hall.id) }
    >
        <h3 className="conf-step__seances-title">Зал {props.hall.name}</h3>
        <div className="conf-step__seances-timeline">
          {props.children}
        </div>
    </div>
    );
};

export default HallsWithTimeline;