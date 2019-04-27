import React, { Component } from 'react';

class Chair extends Component {
    
    state = {
        isSelected:false
    }
    

    handleClick = ( ) => {
        this.setState({
            isSelected:!this.state.isSelected
        })
        
    }
    

    render() {
        
        const { chair, rowKey, chairKey  } = this.props
        switch(chair){
            case 'v':
                return(
                    <span 
                        className={this.state.isSelected ? "buying-scheme__chair buying-scheme__chair_vip buying-scheme__chair_selected" : "buying-scheme__chair buying-scheme__chair_vip" }
                        onClick={ () => {
                            this.handleClick()
                            this.props.selectChairs(chair, rowKey, chairKey)
                        }}
                    ></span>
                )
            
            case 't':
                return(
                    <span
                        className="buying-scheme__chair buying-scheme__chair_taken"
                    ></span>
                )
            case 'd':
                return(
                    <span   
                        className="buying-scheme__chair buying-scheme__chair_disabled"
                    ></span>
                )
            default:
                return(
                    <span
                        className={this.state.isSelected ? "buying-scheme__chair buying-scheme__chair_standart buying-scheme__chair_selected" : "buying-scheme__chair buying-scheme__chair_standart"}
                        onClick={ () => {
                            this.handleClick()
                            this.props.selectChairs(chair, rowKey, chairKey ) 
                        }}
                    ></span>
                )
        }
    }    
}

export default Chair;