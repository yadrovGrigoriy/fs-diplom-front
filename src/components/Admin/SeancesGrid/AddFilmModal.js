import React from 'react';

const AddFilmModal = ({ onSubmit, cancel, formError, defaultValue }) => {
    console.log(defaultValue)
    return (
        <div className="form__wrapper">
             <form onSubmit={(event) => onSubmit(event, defaultValue? "updateFilm" : "addFilm") }>
                <h2>Добавить фильма</h2>
                <div className="form-group">
                    <label className="label">Название фильма</label> 
                    <input 
                        defaultValue={defaultValue && defaultValue.title} 
                        className="form__input"
                        type="text"
                        name="title" 
                        placeholder='Название фильма'/>
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="time">Описание</label>
                        <textarea 
                            defaultValue={defaultValue && defaultValue.description}  
                            className="form__input"  
                            type="text" 
                            name="description" 
                        />    
                </div>
                <div className="form-group">
                    <label className="label">Ссылка на изображение</label> 
                    <input 
                        defaultValue={defaultValue? defaultValue.poster : 'template.jpg'}  
                        className="form__input"
                        type="text"
                        name="poster"
                        placeholder='Название постера.jpg'/>
                </div>
                <div className="form-group">
                    <label className="label">Продожительность Фильма</label> 
                    <input 
                        defaultValue={defaultValue && defaultValue.duration}  
                        className="form__input"
                        type="number"
                        name="duration" 
                        placeholder='минут'/>
                </div>
                <div className="form-group">
                    <label className="label">Страна производства</label> 
                    <input 
                        defaultValue={defaultValue && defaultValue.country} 
                        className="form__input"
                        type="text"
                        id="country" 
                        name="country" 
                        placeholder='Страна производства'/>
                </div>
                {defaultValue && <input type="hidden" name="film_id" value={defaultValue.id}/>}
                

                {formError && <p className="form_error">Ошибка: {formError}</p>}

                <button className="conf-step__button conf-step__button-accent" type="submit">{defaultValue? 'Изменить' : 'Добавить' }</button>
                <button className="conf-step__button conf-step__button-accent" onClick={()=> cancel('showAddFilmModal')} >Отменить</button>
                

            </form>
        </div>
    );
};

export default AddFilmModal;