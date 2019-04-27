import React, { Component } from 'react';
import AdminSectionHeader from '../AdminSectionHeader';
import shortid from 'shortid';
import axios from 'axios';
import Preloader from '../../Client/Preloader';
import AddSeanceModal from './AddSeanceModal';
import AddFilmModal from './AddFilmModal';
import RemoveSeanceModal from './RemoveSeanceModal';
import RemoveFilmModal from './RemoveFilmModal';
import Buttons from '../HallConfig/Buttons';
import SeancesOnTimeline from './SeancesOnTimeline';
import { getRandomColor } from '../../misc';

class SeancesGrid    extends  Component {
    constructor(props){
        super(props);
        this.state = {
            showAddFilmModal:false,
            showAddSeanceModal:false,
            showRemoveSeanceModal:false,
            showRemoveFilmModal:false,
            isSubmiting:false,
            seances:this.props.seances,
            seancesToAdd:[],
            seancesToRemove:[],
            formError:'',
            removeSeanceId:null,
            removeFilmId:null,
            updateFilm:null,
            onDrop:{
                hallId:'',
                filmId:'',
                bgc:''
            }
        }
    }
  
    activeModal = (name) => {
        this.setState({
            [name]:!this.state[name],
            formError:''
        })
    }
   
    submitFilm = (event, route) => {
        event.preventDefault();
        const newFilm = {};
        Array.from(event.target).forEach(field =>  newFilm[field.name] = field.value)
        this.setState({
            isSubmiting:true
        })
        axios({
            method:'post',
            url:`https://fs.h1n.ru/api/${route}`,
            data:{...newFilm},
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then(res =>{
            this.setState({
                showAddFilmModal:false,
                isSubmiting:false,
                updateFilm:null
            })
            this.props.updateData(res.data)
        })
    }

    removeFilm = (event) => {
        event.preventDefault();
        this.setState({
            isSubmiting:true
        });
        const dataToRemove = event.target.filmId.value;
        axios({
            method:'post',
            url:'https://fs.h1n.ru/api/deleteFilm',
            data:{id:dataToRemove},
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then(res=>{
            this.setState({
                isSubmiting:false,
                showRemoveFilmModal:false,
            });
            this.props.updateData(res.data);
        });
    }

    dragStart = (event, item, type) => {
        if(type === 'film'){
            event.dataTransfer.setData('filmId', item.id)
        }
        if(type === 'seance') {
            setTimeout(() => {
                this.setState({
                    showRemoveSeanceModal:true,
                    removeSeanceId:item.id
                })
            }, 0)
        }
    }
    
    onDrop = (event, hallId) => {
        if(!event.dataTransfer.getData('filmId')) return;
        this.setState({
            showAddSeanceModal:true,
            onDrop:{
                hallId: hallId,
                filmId: event.dataTransfer.getData('filmId'),
            }
        });
    }

    updateSeancesTimeline = (event) => {
        event.preventDefault()
        this.setState({
            isSubmiting:true
        })
        
        const removeData = this.state.seancesToRemove
            .filter(seance => typeof seance.id === 'number')
            .map(seance =>  seance.id);
        axios({
            method:'post',
            url:'https://fs.h1n.ru/api/removeSeances',
            data:{removeSeances:JSON.stringify(removeData)},
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then(()  => {

            axios({
                method:'post',
                url:'https://fs.h1n.ru/api/addSeances',
                data:{seances:JSON.stringify(this.state.seancesToAdd)},
                headers: {
                    Authorization:`${this.props.auth}`
                }
            })
            .then( res => {
                this.setState({
                    isSubmiting:false,
                    seancesToRemove:[],
                    seancesToAdd:[]
                })
                this.props.updateData(res.data)
            })
        })
    }

    removeSeanceHandler = (event) => {
        event.preventDefault();
        const removableItemId = event.target.seanceId.value
        const removeItem = this.state.seances.find(seance => seance.id == removableItemId)
        const seancesWithoutRemoveItem = this.state.seances.filter( seance => seance.id != removableItemId);
        this.setState({
            showRemoveSeanceModal:false,
            seances:[...seancesWithoutRemoveItem],
            seancesToRemove:[...this.state.seancesToRemove, removeItem]
        })
    }

    addSeanceHandler = (event) => {
        event.preventDefault();
        const newSeance = {}
        Array.from(event.target).forEach(field =>  newSeance[field.name] = field.value);
        
        
        console.log(newSeance.time)
        newSeance.id = shortid.generate()
        const seances = this.state.seances
        const films = this.props.films
        // если время меньше 00:00 и больше 23:59
        
        if(toMinuts(newSeance.time) > 719 || toMinuts(newSeance.time) < 0){
            this.setState({
                formError:'Время начала сеанса может быть с 0:00 до 23:59'
            });
            return false;
        }

        // если время сеанса занято
    
        const seancesFilteredByHall = seances.filter(seance => parseInt(seance.hall_id)  === parseInt(newSeance.hall_id));
        seancesFilteredByHall.sort((a,b) => parseInt(a.time) - parseInt(b.time))
        const newSeanceBegin = toMinuts(newSeance.time);
        console.log(newSeanceBegin)
        
        const foundSeance = seancesFilteredByHall.find(seance => {
            const film  = films.find(film => film.id === parseInt(seance.film_id));
            if(!film)return null;
            let seanceBegin =  toMinuts(seance.time);
            let seanceEnd = seanceBegin + film.duration*0.5;
            if(seanceEnd > 720 ) {
                seanceEnd = 720 - seanceBegin;  
            }
            return  newSeanceBegin >= seanceBegin &&  newSeanceBegin < seanceEnd
        })

        if(foundSeance ) {
            this.setState({
                formError:'Это время занято'
            });
            return false
        } 
        
        
        //если время сеанса свободно 
        
        const film = films.find(film => parseInt(newSeance.film_id) === parseInt(film.id)  );
        const firstSeance = seancesFilteredByHall.find(seance => {
            const seanceBegin =  toMinuts(seance.time);
            return newSeanceBegin < seanceBegin
        })
        if( firstSeance && (newSeanceBegin + film.duration*0.5) > toMinuts(firstSeance.time)){
            this.setState({
                formError:'конец сенса позже начала сенса следующего фильма'
            });
            return false
        }
        
        this.setState({
            formError:'',
            seancesToAdd:[...this.state.seancesToAdd, newSeance],
            seances:[...this.state.seances, newSeance],
            showAddSeanceModal:false
        });
    }

    cancel = () => {
        this.setState({
            seances:this.props.seance
        })
    }
    
  

    render() {
       const filmsColors = this.props.films.map(film => {
            return {
                filmId:film.id,
                color:getRandomColor()
            }
        })
        return (
            <section className="conf-step">
                <AdminSectionHeader title={'Сетка сеансов'} />
               
                {
                    this.state.showAddFilmModal
                    &&
                    <AddFilmModal 
                        defaultValue={this.state.updateFilm}
                        formError={this.state.formError}
                        cancel={this.activeModal}
                        onSubmit={this.submitFilm}
                        updateFilm={this.updateFilm}
                    />}
                {
                    this.state.showAddSeanceModal
                    &&
                    <AddSeanceModal
                        onDrop={this.state.onDrop}
                        halls={this.props.halls}
                        formError={this.state.formError}
                        cancel={this.activeModal}
                        onSubmit={this.addSeanceHandler}
                        onChange={this.inputHandler}
                        removeFilm={this.removeFilm}
                    /> 
                }
                {
                    this.state.showRemoveSeanceModal
                    &&
                    <RemoveSeanceModal
                        removeSeanceId={this.state.removeSeanceId}
                        removeSeance={this.removeSeanceHandler}
                        cancel={this.activeModal}
                    />
                }
                {
                    this.state.showRemoveFilmModal 
                    &&
                    <RemoveFilmModal
                        removeFilmId={this.state.removeFilmId}
                        removeFilm={this.removeFilm}
                        cancel={this.activeModal}
                    />
                }

               
                <div className="conf-step__wrapper">
                {this.state.isSubmiting && <Preloader/>}
                    <p className="conf-step__paragraph">
                        <button className="conf-step__button conf-step__button-accent" onClick={() => this.setState({showAddFilmModal:true})}>Добавить фильм</button>
                    </p>
                    <div className="conf-step__movies">
                        { 
                            this.props.films.map( (film, i) => (
                                <div 
                                    style={{backgroundColor:filmsColors[i].color}}
                                    key={shortid.generate()} 
                                    draggable 
                                    className="conf-step__movie" 
                                    onDragStart={(event) => this.dragStart(event, film, 'film')}
                                >
                                    <span className="edit_film " onClick={()=>this.setState({updateFilm:film, showAddFilmModal:true})}>Изменить</span>
                                    <span className="remove_film " onClick={() => this.setState({showRemoveFilmModal:true, removeFilmId:film.id})}>Удалить</span>
                                    <img className="conf-step__movie-poster" alt={film.poster} src={require(`../../../images/client/${film.poster}`)}/>
                                    <h3 className="conf-step__movie-title">{film.title}</h3>
                                    <p className="conf-step__movie-duration">{film.duration} Минут</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="conf-step__seances">
                        {
                            this.props.halls.map(hall => (
                                    <div 
                                        key={shortid.generate()} 
                                        className="conf-step__seances-hall"
                                        data-key={hall.id}  
                                        onDragOver={(event) => event.preventDefault()}
                                        onDrop={(event) => this.onDrop(event, hall.id) }
                                    >
                                        <h3 className="conf-step__seances-title">Зал {hall.name}</h3>
                                        <div className="conf-step__seances-timeline">
                                           <SeancesOnTimeline 
                                               filmsColors={filmsColors}  
                                               seancesList={this.state.seances} 
                                               films={this.props.films} 
                                               hallId={hall.id} 
                                               dragStart={this.dragStart}/>
                                        </div>
                                    </div>
                            ))
                        }
                        <Buttons  cancel={this.cancel} onSave={this.updateSeancesTimeline} />
                    </div>    
                </div>
                
            </section>
        );
    }
};

export default SeancesGrid;

function toMinuts(stringTime){
    return stringTime.split(':').reduce( (hour, min) => (hour * 60 + parseInt(min))*0.5)
 }
 



