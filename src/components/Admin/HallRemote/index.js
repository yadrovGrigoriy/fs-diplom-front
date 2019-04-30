import React, { Component } from 'react';
import AdminSectionHeader from '../AdminSectionHeader';
import Halls from './Halls';
import axios from 'axios';
import Preloader from '../../Client/Preloader';
import ModalWindow from '../../ModalWindow';


class HallRemote extends Component {
    constructor(props){
        super(props)
        this.halls = props.halls
        this.state={
            formError:'',
            isSubmiting:false,
            showAddHallModal:false,
            showRemoveHallModal:false,
            currentHall:null
        }
    }

    activeModal = (name) => {
        this.setState({
            [name]:!this.state[name],
            formError:''
        })
    }

    removeHall = (hall) => {
        if(hall.id){
            this.setState({
                showRemoveHallModal:true,
                currentHall:hall
            })
            return
        } 
        this.setState({
            showRemoveHallModal:false,
            isSubmiting:true

        })
        const findindex = this.props.halls.map(hall => hall.id).indexOf(hall.id)
        this.halls.splice(findindex, 1)

        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/deleteHall`,
            data:{id:this.state.currentHall.id},
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then( (res) => {
            this.setState({
                isSubmiting:false
            })
            this.props.updateData(res.data)
        })
    }

    submitHall = (event) => {
        event.preventDefault()
        const hallName = event.target.hallName.value
       
        if(!hallName){
            this.setState({
                formError:'Поле "Название Зала" не заполнено'
            })
            return 
        }
        if( this.props.halls.some(item => item.name === hallName) ){
            this.setState({
                formError:'Такое название уже есть'
            })
            return 
        }
      
        this.setState({
            showAddHallModal:false,
            isSubmiting:true
        })
        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/createHall`,
            data:{name:hallName},
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then( res=>{
            this.setState({
                isSubmiting:false
            })
            this.props.updateData(res.data)
        })
    }


    render() {
       
        const fields=[
            {   
                element:'input',
                label:'Название зала',
                config:{
                    id:'hallName',
                    type:'text',
                    name:'hallName',
                    placeholder:'Название зала',
                    autoFocus:true
                }
            }
        ]
        return (
            <section className="conf-step">
                <AdminSectionHeader title={'Управление залами'} />
                <Halls 
                    {...this.props}//halls
                    activeModal={this.activeModal}
                    removeHall={this.removeHall}
                />
                {
                    this.state.showRemoveHallModal
                    &&
                    <ModalWindow  
                        title={"Удалить Зал?"}
                        windowName={'showRemoveHallModal'}
                        cancel={this.activeModal}
                        onSubmit={this.removeHall}
                        confirmButtonText={'Удалить'}
                    />
                } 
                {
                    this.state.showAddHallModal
                    &&
                    <ModalWindow 
                        title={'Добавить Зал'} 
                        fields={fields}
                        windowName={'showAddHallModal'}
                        onSubmit={this.submitHall}
                        cancel={this.activeModal}
                        formError={this.state.formError}
                        confirmButtonText={'Добавить Зал'}
                    />
                }


                { this.state.isSubmiting && <Preloader/>} 

            </section>
        );
    }
}

export default HallRemote;