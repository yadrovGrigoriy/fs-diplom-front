import React from 'react';
import shortId from 'shortid';

const AddSeanceModal = ({ halls, onSubmit, cancel, formError, onDrop }) => {
   
    return (
        <div className="form__wrapper">
             <form onSubmit={onSubmit}>
                <h2>Добавить сеанс</h2>
                <div className="form-group" >
                    <label className="label">Зал</label> 
                        <select name="hall_id" className="form__select" defaultValue={onDrop.hallId}>
                        {
                            halls.map(hall => <option key={shortId.generate()} value={hall.id}>Зал {hall.name }</option>)
                        }
                        </select>
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="time">Время начала</label>
                        <input  className="form__input"   type="text"  name="time" placeholder='Формат НН:MM'  autoFocus/>
                        <input  className="form__input"  type="hidden" name="film_id" value={onDrop.filmId}/>
                </div>
                
                {formError && <p className="form_error">Ошибка: {formError}</p>}

                <button className="conf-step__button conf-step__button-accent" type="submit">Добавить</button>
                <button className="conf-step__button conf-step__button-accent" onClick={()=> cancel('showAddSeanceModal')} >Отменить</button>
            </form>
        </div>
    );
};

export default AddSeanceModal;