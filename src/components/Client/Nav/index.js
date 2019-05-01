import React  from 'react';
import NavItem from './NavItem';


const  Nav = (props) => (
        <nav className="page-nav">
        {
            props.week.map( (day, key) => (
                <NavItem
                    key={key}
                    day={day}
                    isActive={day === props.date}
                    chooseTab={props.selectDay}
                />
            ))
        }
        </nav>
)


export default Nav;