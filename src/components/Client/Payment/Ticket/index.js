import React from 'react';
import QRCode from 'qrcode.react';
import { reserveParse } from '../../../misc';



const MainTicket = ({  ticket, film, seance, hall, isController }) => {
    const reservedRow = reserveParse(ticket.reserve).row;
    const reservedChairs = reserveParse(ticket.reserve).chairs;
      
        return (
            <main>
                <section className="tichet">
                    <header className="tichet__check">
                        <h2 className="ticket__check-title">Электронный билет</h2>             
                    </header>

                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм:  
                            <span className="ticket__details ticket__title"> {film.title}</span>
                        </p>
                        <p className="ticket__info">Ряд: <span className="ticket__details ticket__chairs">{reservedRow.join(', ')}</span></p>
                        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{reservedChairs.join(', ')}</span></p>
                        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.name}</span></p>
                        <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{seance.time}</span></p>
                        
                        <QRCode
                            className="ticket__info-qr"
                            value={ticket.qr_code}
                            size={200}
                        />
                        {
                            !isController && 
                            <div>
                                <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
                                <p className="ticket__hint">Приятного просмотра!</p>
                            </div>
                        }
                    </div>
                </section>
            </main>
        );
    }


export default MainTicket;