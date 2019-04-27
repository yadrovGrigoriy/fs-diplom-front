import React from 'react';


const RemoveSeanceModal = ({removeSeance, cancel, removeSeanceId}) => {
    
    return (
        <div className="form__wrapper">
             <form onSubmit={removeSeance}>
                <h2>Снять с показа</h2>
                <p className="form__input" >Вы уверены что хотите снять фильм с показа? </p>
                <input  className="form__input"  type="hidden" name="seanceId" value={removeSeanceId}/>
                <button className="conf-step__button conf-step__button-accent" >Снять</button>
                <button className="conf-step__button conf-step__button-accent" onClick={()=> cancel('showRemoveSeanceModal')} >Отменить</button>
            </form>
        </div>
    );
};

export default RemoveSeanceModal;