import React from 'react';
import shortid from 'shortid';

 
const Halls = (props) => {
        return (
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Доступные залы:</p>
                <ul className="conf-step__list">
                    {
                        props.halls.map(hall => (
                            <li key={shortid.generate()}>
                                Зал {hall.name} 
                                <button className="conf-step__button conf-step__button-trash" onClick={() =>props.removeHall(hall)} ></button>
                            </li>
                        ))
                    }
                </ul>
                
                <button 
                    className="conf-step__button conf-step__button-accent" 
                    onClick={() => props.activeModal('showAddHallModal')}
                >
                    Создать зал
                </button>
            </div>
        );
}

export default Halls;