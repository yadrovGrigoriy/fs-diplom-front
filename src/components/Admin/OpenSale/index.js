import React from 'react';
import AdminSectionHeader from '../AdminSectionHeader';
import axios from 'axios';


class OpenSale extends React.Component  {
    openSale = () => {
        const avaliableSeances = this.props.seances.filter(seance => seance.avaliable === '0');
        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/openSale`,
            data:{
                seances:JSON.stringify(avaliableSeances.map(seance=> seance.id))
            },
            headers: {
                Authorization:`${this.props.auth}`
            }
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    render(){
        return (
            <section className="conf-step">
                <AdminSectionHeader title={'Открыть продажи'} />
                <div className="conf-step__wrapper text-center">
                    <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                    <button className="conf-step__button conf-step__button-accent" onClick={this.openSale}>Открыть продажу билетов</button>
                </div>
            </section>
        );

    }
   
};

export default OpenSale;