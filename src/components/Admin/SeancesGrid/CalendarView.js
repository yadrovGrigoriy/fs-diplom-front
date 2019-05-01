import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

class CalendarView extends Component {
    render() {
        
        return (
            <div style={{textAlign:'center'}} >
                <p className="conf-step__paragraph">
                    <button className="conf-step__button conf-step__button-accent" onClick={() => this.props.activeModal('showCalendar')}>Выбрать дату</button>
                </p>
                {
                    this.props.isActive && 
                        <Calendar
                            className="calendar"
                            onChange={this.props.onChange}
                            value={this.props.currentDate}
                        />
                }
                    <p className="conf-step__paragraph " style={{margin:'20px'}}>
                    <strong>Расписание на</strong><br/>    {this.props.currentDate.toLocaleString('ru-RU',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>  
            </div>
        );
    }
}

export default CalendarView;