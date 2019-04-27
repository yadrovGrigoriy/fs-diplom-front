import React from 'react';

const Header = ({subTitle, isAdmin, ...props}) => {
    return (
        <header className="page-header">
            {
                isAdmin
                 &&
                <button 
                    className="conf-step__button conf-step__button-accent" 
                    onClick={props.logout}
                    style={{position:'absolute', right:'0', top:'15px'}}
                >Выход</button>
            }
            <h1 className="page-header__title">Идём<span>в</span>кино</h1>
            {subTitle && <span className="page-header__subtitle">{ subTitle }</span> }
        </header>
    );
};

export default Header;