import React from 'react';

const HallsWithTimeline = (props) => {
    return (
        <div 
        key={shortid.generate()} 
        className="conf-step__seances-hall"
        
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => this.onDrop(event, hall.id) }
    >
        <h3 className="conf-step__seances-title">Зал {hall.name}</h3>
        <div className="conf-step__seances-timeline">
          {props.children}
        </div>
    </div>
    );
};

export default HallsWithTimeline;