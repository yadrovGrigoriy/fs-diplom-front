




export const uniqueArrValue = (value, index, self) => { 
    return self.indexOf(value) === index;
}

export  const getRandomColor = () => {
        const  letters = '0123456789ABCDEF';
        let  color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
export  const reserveParse = (reserve) => {
    let reservedRow = JSON.parse(reserve).map(ticket => ticket.row);
    reservedRow = reservedRow.filter(uniqueArrValue).sort(function(a,b){return a - b});
    const reservedChairs = JSON.parse(reserve).map(ticket => ticket.chair).sort(function(a,b){return a - b})
    return {
        row:reservedRow,
        chairs:reservedChairs
    }
}

export const  currentWeekFill = () => {
    const week = [];
    const day = new Date();
    if(day.getDay() === 0) {
        day.setDate(day.getDate() - 7)
    } else {
        day.setDate(day.getDate() - day.getDay() )  
    } 
    for(let i = 0; i < 7; i++){
        day.setDate(day.getDate() + 1 )
        week[i] =  new Date(day)
    }
    
    return week
}

export const toMinuts = (stringTime) => {
    return stringTime.split(':').reduce( (hour, min) => (hour * 60 + parseInt(min))*0.5)
 }

 