import React, { Component } from 'react';
import NavItem from './NavItem';


class Nav extends Component {
    constructor(){
        super()
        this.currentWeek = this.currentWeekFill()
        this.state={
            selectedItem: this.currentWeek.find(day => day.getDate() === new Date().getDate())
        }
    }
    
    currentWeekFill = () => {
        const week = [];
        const day = new Date();
        day.setDate(day.getDate() - day.getDay() )  
        
        for(let i = 0; i < 7; i++){
            day.setDate(day.getDate() + 1 )
            week[i] =  new Date(day)
        }
        
        return week
    }

    chooseTab = (event, selectedItem) => {
        event.preventDefault();
        this.setState({
            selectedItem
       })
    }


    render() {
        const { selectedItem } = this.state
        
        return (
            <nav className="page-nav">
            {
                this.currentWeek.map( (day, key) => (
                    <NavItem
                         key={key}
                         day={day}
                         isActive={day === selectedItem}
                         chooseTab={this.chooseTab}
                    />
                ))
            }
     
         </nav>
        );
    }
}

export default Nav;