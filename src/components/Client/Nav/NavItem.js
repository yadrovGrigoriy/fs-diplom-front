import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavItem extends Component {
    
    render() {
        const { day } = this.props
        if(day.getDate() === new Date().getDate() ){
            return( 
                <Link 
                    className={this.props.isActive? "page-nav__day page-nav__day_today page-nav__day_chosen" : "page-nav__day page-nav__day_today"}
                    onClick={(event) => this.props.chooseTab(event, day) }
                    to="#"
                >
                    <span className="page-nav__day-week">{ day.toLocaleString('ru', {weekday: 'short'})}</span>
                    <span className="page-nav__day-number">{ day.getDate() }</span>
                </Link>
            )
            
        } else if( day.getDay() === 6 || day.getDay() === 0 ) {
            return(
                <Link 
                    className={this.props.isActive? "page-nav__day page-nav__day_weekend page-nav__day_chosen" : "page-nav__day page-nav__day_weekend"} 
                    to="#"
                    onClick={(event) => this.props.chooseTab(event, day) }
                >
                    <span className="page-nav__day-week">{ day.toLocaleString('ru', {weekday: 'short'})  }</span>
                    <span className="page-nav__day-number">{ day.getDate() }</span>
                </Link>
            )    
        } else {
            return( 
                <Link
                    className={this.props.isActive ? "page-nav__day page-nav__day_chosen" : "page-nav__day"}
                    onClick={(event) => this.props.chooseTab(event, day) }
                    to="#"
                >
                    <span className="page-nav__day-week">{ day.toLocaleString('ru', {weekday: 'short'})  }</span>
                    <span className="page-nav__day-number">{ day.getDate() }</span>
                </Link>
            )
        }
        
    }
}

export default NavItem;