import React, { Component } from 'react';
import axios from 'axios';
import Preloader from '../Client/Preloader';


class Auth extends Component {
    
       state = {
            email: '',
            password: '',
            clientId:null,
            clientSecret:null,
            isLoading:true,
            urlTo:''
        }
   
   

    submitForm = (event) => {
        this.setState({
            isLoading:true
        })
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,{
                client_id: this.state.clientId,
                client_secret: this.state.clientSecret,
                grant_type: 'password',
                username: this.state.email,
                password: this.state.password
            })
            .then(res => {
                localStorage.setItem('token', res.data.access_token )
                localStorage.setItem('token_type', res.data.token_type)
                this.setState({
                    isLoading:false
                })
                
                if(this.state.urlTo === 'admin' || this.state.urlTo === ''){
                    this.props.history.push('/admin')
                }else if(this.state.urlTo === 'controller'){
                    this.props.history.push('/controller')
                }
            })
    }

    handlerForm = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    
    
    componentDidMount(){
        if(localStorage.getItem('token')){
            const urlTo = this.props.history.location.search.substr(1)
            if(urlTo === 'admin' || urlTo === ''){
                this.props.history.push('/admin')
            }else if(urlTo === 'controller'){
                this.props.history.push('/controller')
            }
        } else {
            this.setState({
                urlTo:this.props.history.location.search.substr(1)
            })
        }
        
        axios.get(`${process.env.REACT_APP_API_URL}/oauth`) 
            .then(res=> {
                this.setState({
                    clientId: res.data.client.id,
                    clientSecret: res.data.client.secret,
                    isLoading:false
                })
            })
        }

    
    render() {
        if(this.state.isLoading) return <Preloader/>
        return (
            <div className="client_body" >
                <div className="form__wrapper " >
                   
                    <form >
                        <h2> Email</h2>
                        <div className="auth__form">
                            <input
                                className="form__input"
                                type="email"
                                id="email"
                                onChange={this.handlerForm }
                              
                            />
                        </div>
                        <hr/>
                    
                        <h2> Password</h2>
                        <div className="auth__form">
                            <input
                               className="form__input"
                               type="password"
                               id="password"
                               onChange={this.handlerForm }
                            />
                        </div>
                    <hr/>
                    
                        <button className="conf-step__button conf-step__button-accent" onClick={this.submitForm}  >Авторизоваться</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;