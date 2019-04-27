import React from 'react';

const Buttons = (props) => {
    return (
        <div className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular"onClick={props.cancel}>Отмена</button>
            <input type="submit" onClick={props.onSave} value="Сохранить" className="conf-step__button conf-step__button-accent"/>
        </div>  
    );
};

export default Buttons;

