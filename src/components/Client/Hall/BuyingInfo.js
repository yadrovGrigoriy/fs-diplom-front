import React from 'react';

const BuyingInfo = ({ film, hall, seance }) => (
        <div className="buying__info">
            <div className="buying__info-description">
                <h2 className="buying__info-title">{ film.title}</h2>
                <p className="buying__info-start">Начало сеанса: { seance.time }</p>
                <p className="buying__info-hall"> Зал { hall.name }</p>
            </div>
            <div className="buying__info-hint">
                <p> Тапните дважды,<br/>>чтобы увеличить </p>
            </div>
        </div>
);

export default BuyingInfo;