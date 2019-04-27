import React, { Component } from 'react';
import AdminSectionHeader from '../AdminSectionHeader';
import ChangeHall from './ChangeHall';
import CountChairs from './CountChairs';
import Legend from './Legend';
import Schema from './Schema';
import Buttons from './Buttons';
import axios from 'axios';
import Preloader from '../../Client/Preloader';

class HallConfig extends Component {

    constructor(props){
        super(props)
        this.newHallMap = null
        this.countPlaces = {}
        this.state = {
            halls:this.props.halls,
            currentHall:props.halls[0],
            isSubmit:false
        }
    }


    changeTypeChair = (coords) => {
        this.newHallMap = JSON.parse(this.state.currentHall.map);
        if(coords.type === 's') this.newHallMap[coords.row][coords.chair] = "v";
        if(coords.type === 'v') this.newHallMap[coords.row][coords.chair] = "d";
        if(coords.type === 'd') this.newHallMap[coords.row][coords.chair] = "s";
        this.setState({
            currentHall:{...this.state.currentHall, map:JSON.stringify(this.newHallMap)}
        });
    }

    changeNewSchema = (event) => {
        this.countPlaces[event.target.name] = parseInt(event.target.value);
        this.countPlaces.map = JSON.stringify(makeTemplateArray(this.countPlaces));
        this.setState({
            currentHall:{...this.state.currentHall,...this.countPlaces}
        });
        
        
    }

    changeHall = (hall) => {
        this.setState({
            currentHall:hall
        });
    } 

    cancel = () => {
        const currentHallWithoutupdates =  this.state.halls.find(hall=>hall.id === this.state.currentHall.id);
        this.setState({
            currentHall:currentHallWithoutupdates
        });
       
    }
   
    submitNewHallSchema = () => {
        this.setState({
            isSubmit:true
        })
        
        axios({
            method:'post',
            url:'https://fs.h1n.ru/api/updateHall',
            data:{
                id:this.state.currentHall.id,
                rows:this.state.currentHall.rows,
                chairs:this.state.currentHall.chairs,
                map:this.state.currentHall.map
            },
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then(res => {
          this.setState({
                isSubmit:false
            })
            this.props.updateData(res.data)
        })
    }

    render() {
        return (
            <section className="conf-step">
                <AdminSectionHeader title={'Конфигурация залов'}/>
                <div className="conf-step__wrapper">
                    <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                    <ChangeHall halls={this.props.halls} name={'configHall'} checked={this.state.currentHall.name} changeHall={this.changeHall} />
                    <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
                    <CountChairs hall={this.state.currentHall} changeNewSchema={this.changeNewSchema}/>
                    <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                    <Legend/>
                    <Schema hall={this.state.currentHall}  changeTypeChair={this.changeTypeChair} />
                    {this.state.isSubmit && <Preloader />}    
                    <Buttons onSave={this.submitNewHallSchema} cancel={this.cancel} />
                 </div>
            </section>
        );
    }
}

export default HallConfig;


const makeTemplateArray = (newSchema) => {
    if(isNaN(newSchema.rows)  || isNaN(newSchema.chairs) ) return null
    return Array(newSchema.rows).fill(Array(newSchema.chairs).fill('s'))
}