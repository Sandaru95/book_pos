let barCodeInput = document.getElementById('input-section-input');
const itemTableBody = document.getElementById('table-section-table-body');

setInterval(displayTime,1000)
function displayTime(){
    const timeNow = new Date();
    let hours = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let month = timeNow.getMonth();
    let year = timeNow.getFullYear();
    let date = timeNow.getDate();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let timeStr = hours + ":" + minutes + ":" + seconds;
    document.getElementById('clock').innerText = timeStr;
    document.getElementById('date').innerText = `${year}/${month}/${date}`;
};displayTime();

let item;
document.addEventListener("keypress", (e) => {
    if(e.code == "Enter"){
        console.log('enter pressed');
        
        books.map(book => book.item_code == barCodeInput.value ? item = book: item = item);
        barCodeInput.value = '';
    };
});
document.addEventListener("keypress", (key) => {
    if(key.code == 'NumpadAdd'){
        key.preventDefault();
        item['qty'] = Number(barCodeInput.value);
        items.push(item);
        renderItemsToTable();
    };
});

function renderItemsToTable(){
    let itemInner = '';
    items.map(i => itemInner += `
        <tr>
            <th>${i.item_code}</th>
            <th>${i.title}</th>
            <th>${i.qty}</th>
            <th>${i.price}</th>
            <th>${Number(i.qty) * Number(i.price)}</th>
        </tr>
    `);
    itemTableBody.innerHTML = itemInner;
    calculateTotals();
};

function calculateTotals(){
    let total = 0;
    items.map(item => total += (Number(item.price) * Number(item.qty)));
    document.getElementById('total').innerText = `Rs.${total}`;
};

document.addEventListener("keypress", e => e.code == "Numpad9" ? window.location.replace('/backend/') : e.code == "Numpad1" ? window.location.replace('/cashier/logout/') : console.log());