import React from 'react';
import AdminSectionHeader from '../AdminSectionHeader';


const OpenSale = () => {
    return (
        <section className="conf-step">
            <AdminSectionHeader title={'Открыть продажи'} />
            <div className="conf-step__wrapper text-center">
                <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
            </div>
        </section>
    );
};

export default OpenSale;