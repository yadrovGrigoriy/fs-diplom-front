import React from 'react';
import shortId from 'shortid';

const ModalWindow = ({title, fields, onSubmit, cancel, windowName, formError, confirmButtonText, options, delButton}) => {
    

    const template = (field) => {
        switch(field.element){
            case 'input':
                return(
                    <input  key={shortId.generate()}
                        className="form__input" 
                        {...field.config}
                    />
                )
            case 'textarea':
                return(
                    <textarea  key={shortId.generate()}
                        className="form__input" 
                        {...field.config}
                    />
                )
            default:
            return null    
        }
    }
    return (
        <div className="form__wrapper">
             <form onSubmit={onSubmit}>
                <h2>{title}</h2>
                {  
                    !!fields && fields.map(field => ( 
                        <div key={shortId.generate()} className="form-group">
                            <label className="label">{field.label}</label> 
                            {template(field)}
                        </div>
                         ))
                   
                }
                {formError && <p className="form_error">Ошибка: {formError}</p>}

                <button className="conf-step__button conf-step__button-accent" type="submit" >{confirmButtonText}</button>
                <button className="conf-step__button conf-step__button-accent" onClick={() => cancel(windowName)} >Отменить</button>
            </form>
        </div>
    );
};

export default ModalWindow;