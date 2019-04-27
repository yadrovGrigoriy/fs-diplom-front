import React from 'react';
import Chair from './Chair';

const RenderChairs = ({ chairs, selectChairs } ) => (
    chairs.map( (row, rowKey) => (
            <div key={rowKey} className="buying-scheme__row">
            {
                row.map( (chair, key) => (
                    <Chair 
                        key={key}
                        chair={chair}
                        rowKey = {rowKey + 1}
                        chairKey={key + 1}
                        selectChairs={selectChairs}
                    />                                          
                ))
            }
        </div> 
        
    ))
);

export default RenderChairs;