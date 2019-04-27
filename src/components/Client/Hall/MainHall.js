import React, { Component } from 'react';
import { Redirect } from  'react-router-dom';
import BuyingInfo from './BuyingInfo';
import BuyingSchema from './BuyingSchema';
import axios from 'axios';
import Preloader from '../Preloader.js';


class MainHall extends Component {
    constructor(props){
        super(props);
        this.reservedChairs = [];
        this.totalPrice = 0;

        this.state = {
            isSubmiting:false,
            isSubmit:false,
            ticket:null,
            errors:[],
            seanceId:props.seance.id
        }
    }

    submitTicket = () => {
        this.reservedChairs.forEach ( chair => {
            if(chair.selectedChair === 's'){
                this.totalPrice = this.totalPrice + parseInt(this.props.hall.price);
            }
            if(chair.selectedChair === 'v'){
                this.totalPrice = this.totalPrice + parseInt(this.props.hall.price_vip);
            }
        })
        this.setState({
            isSubmiting:true
        })

        console.log(this.state.seanceId,JSON.stringify(this.reservedChairs), this.totalPrice )
        
        axios.post('https://fs.h1n.ru/api/addTicket', {
                seance_id: this.state.seanceId,
                reserve: JSON.stringify(this.reservedChairs),
                total_price: this.totalPrice,
            })
            .then(res =>{
                this.setState({
                    ticket:res.data,
                    isSubmit:true,
                    isSubmiting:false
                })
            })
    }

    selectChairs = (selectedChair, row, chair) => {
        const place = {selectedChair, row, chair }
        if(this.reservedChairs.find(chair => JSON.stringify(chair) === JSON.stringify(place))){
            this.reservedChairs.splice(this.reservedChairs.indexOf(place), 1)
        } else {
            this.reservedChairs.push(place)
        }
    }
    
    render() {
        const { hall, tickets } = this.props
        if(this.state.isSubmit){
            return <Redirect to={`/payment/${this.state.ticket.id}`}/>
        } 
        return (
            <main>
                {this.state.isSubmiting && <Preloader/>}
                <section className="buying">

                    <BuyingInfo { ...this.props}/>
                    <BuyingSchema hall={hall} tickets={tickets} selectChairs={this.selectChairs}/>

                    <button className="acceptin-button" type='button' onClick={this.submitTicket}>Забронировать</button>
                </section>

            </main>
        );
    }
}

export default MainHall;