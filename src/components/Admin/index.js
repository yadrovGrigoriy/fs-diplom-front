import React, { Component } from 'react';
import Header from '../Header';
import Preloader from '../Client/Preloader';
import HallRemote from './HallRemote';
import HallConfig from './HallConfig';
import PriceConfig from './PriceConfig';
import SeancesGrid from './SeancesGrid';
import OpenSale from './OpenSale';
import axios from 'axios'




class Admin extends Component {
    constructor(){
        super()
        this.auth = ''
        this.state = {
            data: [],
            isLoading:true,
        }                
    }
    


    componentDidMount() {
        if(!localStorage.getItem('token')){
             this.props.history.push('/login?admin')
        } else {
            this.auth = localStorage.getItem('token_type') + ' ' + localStorage.getItem('token') 
        }     
        
        fetch(`${process.env.REACT_APP_API_URL}/index`)
            .then(res=> res.json())
            .then(res=>{
                this.setState({
                    data:{...res},
                    isLoading:false
                })
            })
    }

    logout = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`,{
            headers: {Authorization:`${this.auth}`}
        })
        .then(res=>{
            if(res.data.message === 'Successfully logged out'){
                localStorage.removeItem('token')
                this.props.history.push('/login')
            }
        })
    }

    updateData = (newData) => {
        this.setState({
            data:{...this.state.data, ...newData}
        })
    }

    render() {
        document.body.style.backgroundImage='url(../../../../images/admin/background.jpg)'
        if(this.state.isLoading){
            return <Preloader/>
        } else {
           
            return (
                <div className="admin_body"  >
                    <Header subTitle={'Администраторррская'} isAdmin logout={this.logout} style={{ paddingTop:"35px"}}/>
                    <main className="conf-steps">
                        <HallRemote {...this.state.data} updateData={this.updateData} auth={this.auth}/>
                        <HallConfig {...this.state.data} updateData={this.updateData} auth={this.auth}/>
                        <PriceConfig {...this.state.data} updateData={this.updateData} auth={this.auth} />
                        <SeancesGrid {...this.state.data} updateData={this.updateData} auth={this.auth} />         
                        <OpenSale/>
                    </main>
                </div>
            );
        }
    }
}

export default Admin;

