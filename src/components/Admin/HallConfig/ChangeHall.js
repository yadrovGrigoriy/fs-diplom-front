import React from 'react';
import shortid from 'shortid'

const ChangeHall = ({ halls, name, changeHall, checked  }) => (
            <ul className="conf-step__selectors-box">
                {
                    halls.map(hall => (
                        <li key={shortid.generate()}>
                            <input
                                type="radio"
                                className="conf-step__radio" 
                                name={name}
                                value={hall.name}
                                checked={checked === hall.name}
                                onChange={() => changeHall(hall)}
                            />
                            <span className="conf-step__selector">Зал {hall.name}</span>
                            </li>
                    ))
                }
            </ul>
)

export default ChangeHall;