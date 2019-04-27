import React from 'react';


const RemoveFilmModal = ({removeFilm, cancel, removeFilmId}) => {
    
    return (
        <div className="form__wrapper">
             <form onSubmit={removeFilm}>
                <h2>Удалить фильм?!</h2>
                <p className="form__input" >Вы уверены что хотите безвозвратно удалить фильм? </p>
                <input  className="form__input"  type="hidden" name="filmId" value={removeFilmId}/>
                <button className="conf-step__button conf-step__button-remove" >Удалить</button>
                <button className="conf-step__button conf-step__button-accent" onClick={()=> cancel('showRemoveFilmModal')} >Отменить</button>
            </form>
        </div>
    );
};

export default RemoveFilmModal;