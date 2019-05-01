import React, { Component } from 'react';
import Nav from './Nav';
import Main from './Main';
import Header from '../Header';
import Preloader from './Preloader';
import axios from 'axios';
import { currentWeekFill } from '../misc';


class Client extends Component{
    constructor(){
        super();
        this.currentWeek = currentWeekFill();
        this. state = {
            data:'',
            currentDate:this.currentWeek.find(day => day.getDate() === new Date().getDate()),
            isLoading:true
        }
    }
   
    
    componentDidMount() {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_API_URL}/index`,
        })
        .then(res => {
            this.setState({
                data:res.data,
                isLoading:false
            })
        })
    }
    selectDay = (event, currentDate) => {
        event.preventDefault();
        this.setState({
            currentDate
       })
    }
    render(){
        
        if(this.state.isLoading)return <Preloader/>
        return (
            <div className="client_body" >
                <div  >
                    <Header />
                    <Nav selectDay={this.selectDay} date={this.state.currentDate} week={this.currentWeek}/>
                    <Main {...this.state.data} date={this.state.currentDate}/>
                </div>
            </div>
        );
    }
};

export default Client;