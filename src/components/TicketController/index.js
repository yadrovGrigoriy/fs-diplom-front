import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import MainTicket from '../Client/Payment/Ticket';
import axios from 'axios';
import Preloader from '../Client/Preloader';
 
class TicketController extends Component {
  constructor(props) {
    super(props);
    this.auth=""
    this.state = {
      data: null,
      isLoading:false
    }
  }
  
  
 
  handleScan = data => {
    
    if (data) {
      const ticketInfo = JSON.parse(data);
      console.log(ticketInfo)
      axios.get(`https://fs.h1n.ru/api/getTicket?ticket_id=${ticketInfo.ticket_id}`)
      .then(res=>{

        this.setState({
          data:res.data
        })
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  openImageDialog = () => {
    this.refs.qrReader1.openImageDialog()
  }

  componentDidMount() {
      if(!localStorage.getItem('token')){
        
        this.props.history.push('/login?controller')
      } else {
          this.auth = localStorage.getItem('token_type') + ' ' + localStorage.getItem('token') 
      }     
  }

  render() {
    
    return (
      <div style={{textAlign:'center', padding:'50px'}}>
      {this.state.isLoading && <Preloader/>}
        {!this.state.data && 
          <input
            type="button" 
            className="conf-step__button conf-step__button-accent" 
            value="Загрузите изображение с QR кодом" 
            onClick={this.openImageDialog} />
        } 
        <QrReader
          ref="qrReader1"
          onError={this.handleError}
          onScan={this.handleScan}
          style={{
            display:'none',
             width: '20%',
             margin:'20px auto',
         }}
          legacyMode
        />
        {this.state.data && <MainTicket {...this.state.data} isController/>}
      </div>
    )
  }
}

export default TicketController;