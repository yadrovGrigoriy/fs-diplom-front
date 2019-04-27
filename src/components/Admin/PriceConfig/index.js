import React, { Component } from 'react';
import AdminSectionHeader from '../AdminSectionHeader';
import ChangeHall from '../HallConfig/ChangeHall';
import SetPrice from './SetPrice';
import Buttons from '../HallConfig/Buttons';
import axios from 'axios';
import Preloader from '../../Client/Preloader';

class PriceConfig extends Component {
    constructor(props){
        super(props)
        this.price = ''
        this.priceVIP = ''
        this.halls = {...props.halls}
        this.state = {
            currentHall:this.halls[0],
            isSubmit:false
        }
    }

    changeHall = (hall) => {
        this.setState({
            currentHall:hall
        })
    }
    
   
    submitPrice = () => {
        if(!this.price.value) this.price.value = this.state.currentHall.price
        if(!this.priceVIP.value) this.priceVIP.value = this.state.currentHall.price_vip
        this.setState({
            isSubmit:true
        })
        axios({
            method:'post',
            url:'https://fs.h1n.ru/api/updatePricesHall',
            data:{
                id:this.state.currentHall.id,
                price: this.price.value,
                vip:this.priceVIP.value
            },
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then(res=>{
                this.price.value = ''
                this.priceVIP.value = ''
                this.setState({
                    currentHall:res.data.halls.find(hall=>this.state.currentHall.id === hall.id),
                    isSubmit:false
                })
                this.props.updateData(res.data);
            })
    }
    
    cancel = () => {
        this.price.value = ''
        this.priceVIP.value = ''
    }   


    render() {
        
        return (
            <section className="conf-step">
                <AdminSectionHeader title={'Конфигурация цен'}/>
                <div className="conf-step__wrapper">
                    <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                    <ChangeHall 
                        halls={this.props.halls} 
                        changeHall={this.changeHall} 
                        checked={this.state.currentHall.name} 
                        name={'configPrice'} 
                    />
                    <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
                    <SetPrice
                        hall={this.state.currentHall} 
                        refPrice={el => this.price = el} 
                        refPriceVIP={ el => this.priceVIP = el}
                    />
                    {this.state.isSubmit && <Preloader/>}
                    <Buttons onSave={this.submitPrice} cancel={this.cancel}/>
                </div>

            </section>
        );
    }
}

export default PriceConfig;



