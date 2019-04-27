import React, { Component } from 'react';


class SetPrice extends Component{ 
    
    render() {
        const {hall} = this.props
        
        return (
            <div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Цена, рублей
                        <input 
                            type="number"
                            name='std' 
                            className="conf-step__input" 
                            placeholder={hall.price}
                            ref={this.props.refPrice}
                            // onChange={this.props.changePrice}
                        />
                        </label>
                <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Цена, рублей
                        <input 
                            type="number"
                            name="vip" 
                            className="conf-step__input" 
                            placeholder={hall.price_vip}
                            ref={this.props.refPriceVIP}
                            // onChange={this.props.changePrice} 
                        />
                </label>
                <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
            </div>

            </div>  
         
         );
    }
};

export default SetPrice;