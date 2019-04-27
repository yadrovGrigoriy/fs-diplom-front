import React from 'react';

const Legend = () => {
    return (
        <div className="conf-step__legend">
          <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
          <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
          <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
          <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
        </div> 
    );
};

export default Legend;