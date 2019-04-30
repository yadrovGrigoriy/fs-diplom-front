import React, { Component } from 'react';
import Nav from './Nav';
import Main from './Main';
import Header from '../Header';
import Preloader from './Preloader';
import axios from 'axios';

class Client extends Component{
    state = {
        data:null,
        isLoading:true
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
    render(){
        
        if(this.state.isLoading)return <Preloader/>
        return (
            <div className="client_body" >
                <div  >
                    <Header />
                    <Nav />
                    <Main {...this.state.data} />
                </div>
            </div>
        );
    }
};

export default Client;