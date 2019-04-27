import React from 'react';
import { reserveParse } from '../../misc';


const MainPayment = ({ ticket , film, seance, hall, confirmPay  }) => {
    const reservedRow = reserveParse(ticket.reserve).row;
    const reservedChairs = reserveParse(ticket.reserve).chairs;
    return(
        <main>
            <section className="ticket">
                <div className="ticket__info-wrapper">
                    <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{film.title}</span></p>
                    <p className="ticket__info">Ряд: <span className="ticket__details ticket__chairs">{reservedRow.join(', ')}</span></p>
                    <p className="ticket__info">Место: <span className="ticket__details ticket__chairs">{reservedChairs.join(', ')}</span></p>
                    <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.name.toUpperCase()}</span></p>
                    <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{seance.time}</span></p>
                    <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{ticket.total_price}</span> рублей</p>


                    <button className="acceptin-button" onClick={ () => confirmPay()}>Получить код бронирования</button>

                    <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                    <p className="ticket__hint">Приятного просмотра!</p>
                </div>
            </section>
      </main>
    )   
};

export default MainPayment;




