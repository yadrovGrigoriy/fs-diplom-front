




export const uniqueArrValue = (value, index, self) => { 
    return self.indexOf(value) === index;
}
export const scrollHeight = Math.max(
        window.scrollHeight, window.scrollHeight,
        window.offsetHeight, window.offsetHeight,
        window.clientHeight, window.clientHeight
    );

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

 