import React from 'react';

const CountChairs = ( { hall, ...props }) => {
    return (
        <div className="conf-step__legend">
        <label className="conf-step__label">
            Рядов, шт
            <input 
                type="number" 
                name="rows" 
                className="conf-step__input" 
                placeholder={hall.rows}
                onInput={props.changeNewSchema}
            />
        </label>
        <span className="multiplier">x</span>
        <label className="conf-step__label">
            Мест, шт
            <input 
                type="number" 
                name="chairs" 
                className="conf-step__input" 
                placeholder={hall.chairs} 
                onChange={props.changeNewSchema}
            />
        </label>            
      </div>
    );
};

export default CountChairs;