import React from 'react';
import LegendClientHall from './LegendClientHall'
import RenderChairs from './RenderChairs';


const BuyingSchema = ({ hall, tickets, selectChairs }) => {
    const chairs = JSON.parse(hall.map)
    // отрисовка занятых мест
    for(const ticket of tickets){
        const reservedChairs = JSON.parse(ticket.reserve)
        for(const chair of reservedChairs){
        chairs[chair.row -1][chair.chair - 1] = 't';
        }
    }
   
    return (
        <div className="buying-scheme">
            <div className="buying-scheme__wrapper">
                <RenderChairs chairs={chairs} selectChairs={selectChairs}/>                
            </div>
            <LegendClientHall hall={hall}/>    
        </div>
    );
};

export default BuyingSchema;