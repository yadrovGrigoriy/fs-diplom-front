import React from 'react';

const LegendClientHall = ({ hall }) => (
        <div className="buying-scheme__legend">
            <div className="col">
                <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                    Свободно (<span className="buying-scheme__legend-value">{hall.price}</span>руб)
                </p>
                <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                    Свободно VIP (<span className="buying-scheme__legend-value">{hall.price_vip}</span>руб)
                </p>            
            </div>
            <div className="col">
                <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_taken"></span> 
                    Занято
                </p>
                <p className="buying-scheme__legend-price">
                    <span className="buying-scheme__chair buying-scheme__chair_selected"></span>
                    Выбрано
                </p>                    
            </div>
        </div>
);
export default LegendClientHall;