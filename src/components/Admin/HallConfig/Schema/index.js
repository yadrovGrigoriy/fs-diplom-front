import React, { Component } from 'react';
import ChairAdmin from './ChairAdmin';


class Schema extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        
        let chairs = JSON.parse(this.props.hall.map) 
        return (
            <div className="conf-step__hall">
                <div className="conf-step__hall-wrapper">
                    {
                      chairs && chairs.map( (row, rowKey) => (
                            <div key={rowKey} className="conf-step__row">
                                {
                                    row.map( (chair, key) => (
                                        <ChairAdmin
                                            key={key}
                                            chair={chair}
                                            rowKey = {rowKey }
                                            chairKey={key }
                                            changeTypeChair={this.props.changeTypeChair}
                                        />                                          
                                    ))
                                }
                            </div> 
                        ))
                    }
                </div>
            </div>
            
        );
    }
}

export default Schema;

