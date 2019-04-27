import React from 'react';

const  ChairAdmin = ({ chair, rowKey, chairKey, ...props }) => {
        
        switch(chair){
            case 'v':
                return(
                    <span 
                        className="conf-step__chair conf-step__chair_vip" 
                        onClick={ () => {props.changeTypeChair( {type:chair, row:rowKey, chair:chairKey} )}}
                    ></span>
                )
            case 'd':
                return(
                    <span   
                        className="conf-step__chair conf-step__chair_disabled"
                        onClick={ () => {props.changeTypeChair( {type:chair, row:rowKey, chair:chairKey} )}}
                    ></span>
                )
            case 's':
                return(
                    <span
                        className="conf-step__chair conf-step__chair_standart"
                        onClick={ () => {props.changeTypeChair( {type:chair, row:rowKey, chair:chairKey} )}}
                    ></span>
                )
            default:
            return null    
        }
        
}

export default ChairAdmin;