import React, { Component } from 'react';
import MainHall from './MainHall';
import Header from '../../Header';
import Preloader from '../Preloader';
import axios from 'axios';


class Hall extends Component {

    state = {
        data:null,
        isLoading:true,
    }    

    
    componentDidMount(){
        const seanceId = this.props.match.params.id
        axios.get(`https://fs.h1n.ru/api/client/hall?seance_id=${seanceId}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                data:res.data,
                isLoading:false
            })
        })
        
    }
    render() {
       
        if(this.state.isLoading){
            return <Preloader/>
        }
        return (
            <div className="client_body" style={{  height:window.outerHeight }}>
                <Header/>
                <MainHall {...this.state.data} />
            </div>
        );
    }
}

export default Hall;