import React, { Component } from 'react';
import MainPayment from './MainPayment';
import MainTicket from './Ticket';
import Header from '../../Header';
import Preloader from '../Preloader';
import axios from 'axios';

 


class Payment extends Component {
    state = {
        ticketInfo: null,
        isLoading:true,
        confirmPay:false
    }

    getCodeReserve = () => {
        axios({
            method:'post',
            url:`https://fs.h1n.ru/api/updateTicket`,
            data:{
                id:this.state.ticketInfo.ticket.id,
                qr_code: JSON.stringify({
                    ticket_id:this.state.ticketInfo.ticket.id,
                    seance_id:this.state.ticketInfo.ticket.seance_id,
                    reserve:this.state.ticketInfo.ticket.reserve,
                })
            }
        })
        .then( res => {
            console.log(res.data)
            this.setState({
                ticketInfo:{...this.state.ticketInfo, ticket:res.data },
                confirmPay:true
            })
        })

        
    }

    componentDidMount(){
        axios.get(`https://fs.h1n.ru/api/getTicket?ticket_id=${this.props.match.params.id}`)
        .then(res=> {
            this.setState({
                ticketInfo:res.data,
                isLoading: false
            })
        })
    }

    render() {
        if(this.state.isLoading){
            return <Preloader/>
        }
        return (
            <div className="client_body">
                <Header/>
                {
                    this.state.confirmPay ?
                    <MainTicket {...this.state.ticketInfo} />
                    :
                    <MainPayment {...this.state.ticketInfo}  confirmPay={this.getCodeReserve} />
                }
            </div>
        );
    }
}

export default Payment;