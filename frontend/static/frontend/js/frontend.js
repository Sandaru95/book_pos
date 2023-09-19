let barCodeInput = document.getElementById('input-section-input');
const itemTableBody = document.getElementById('table-section-table-body');
const discountLabel = document.getElementById('discount');
const totalLabel = document.getElementById('total');
const receiptTotal = document.getElementById('receipt-div-total');
const receiptSubTotal = document.getElementById('receipt-div-subtotal');
const receiptDiscount = document.getElementById('receipt-div-discount');
const receiptBalance = document.getElementById('receipt-div-balance');
const receiptContent = document.getElementById('receipt-div-content');
const receiptNo = document.getElementById('receipt-no');
const balanceLabel = document.getElementById('balance');

// This Toast for Every Barcode Read
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

setInterval(displayTime, 1000)
function displayTime() {
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
}; displayTime();

let item;
document.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        console.log('enter pressed');
        console.log(barCodeInput.value);
        if(barCodeInput.value){
            if(barCodeInput.value == "000"){
                // Other Item Price
                let othPrice = prompt("Unit Price(Rs.): ");
                // Other Item QTY
                let othQty = prompt("Qty: ");
                // Other Item Success
                if (othPrice && othQty){
                    Toast.fire({ icon: 'success', title: "Other Item Added!" });
                };
            }else{
                for (let b of books) {
                    if (b.item_code == barCodeInput.value) {
                        item = b;
                    };
                };
                Toast.fire({ icon: 'success', title: item.title });
            };
            barCodeInput.value = '';
        };
    };
});
document.addEventListener("keypress", (key) => {
    if (key.code == 'NumpadAdd') {
        key.preventDefault();
        console.log(item);
        item['qty'] = Number(barCodeInput.value);
        items.push(item);
        renderItemsToTable();
    };
});
document.addEventListener("keypress", (key) => {
    if (key.code == 'NumpadMultiply') {
        key.preventDefault();
        discountLabel.innerHTML = barCodeInput.value;
        let total = 0;
        items.map(item => total += (Number(item.price) * Number(item.qty)));
        totalLabel.innerText = `${total - (total * barCodeInput.value / 100)}`;
        receiptTotal.innerText = `${total - (total * barCodeInput.value / 100)}`;
        // Setting Receipt Discount
        receiptSubTotal.innerHTML = `Rs.${total}`;
        receiptDiscount.innerHTML = `${barCodeInput.value}%`;

        barCodeInput.value = '';
    };
});
document.addEventListener("keypress", (key) => {
    if (key.code == 'NumpadSubtract') {
        key.preventDefault();
        balanceLabel.innerHTML = Number(barCodeInput.value) - Number(totalLabel.innerText);
        barCodeInput.value = '';
        // Setting Receipt Balance
        receiptBalance.innerHTML = `Rs.${balanceLabel.innerHTML}`;
        LetsPrint();
        // Database Update Ajax Happens Now
        console.log('Updating the Database');
        data = {
            data: JSON.stringify(items),
            receipt_no: document.getElementById('receipt-no').value,
            total: totalLabel.innerText,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
        };
        $.ajax({
            type: "POST", url: "/frontend/update/",
            data: data,
            success: function (response) {
                if (response == "success") {
                    resetBillData()
                }
            }
        });
    };
});

function renderItemsToTable() {
    let itemInner = '';
    let receiptInnerContent = '';
    items.map(i => itemInner += `
        <tr>
            <th>${i.item_code}</th>
            <th>${i.title}</th>
            <th>${i.qty}</th>
            <th>${i.price}</th>
            <th>${Number(i.qty) * Number(i.price)}</th>
        </tr>
    `);
    items.map(i => receiptInnerContent += `
        <tr>
            <th>${i.book_type}</th>
            <th>${i.qty} x </th>
            <th>${i.price} = </th>
            <th>${Number(i.qty) * Number(i.price)}</th>
        </tr>
    `);
    itemTableBody.innerHTML = itemInner;
    receiptContent.innerHTML = receiptInnerContent;
    barCodeInput.value = '';
    calculateTotals();
};
function calculateTotals() {
    let total = 0;
    items.map(item => total += (Number(item.price) * Number(item.qty)));
    totalLabel.innerText = total;
    // receiptTotal
    receiptTotal.innerText = `Rs.${total}`;
};
function LetsPrint() {
    printJS('receipt-div', 'html');
};
function resetBillData(){
    // Resetting the Bill Data
    items = [];
    receiptNo.innerHTML = String(Number(receiptNo.innerHTML) + 1);
    itemTableBody.innerHTML = '';
    totalLabel.innerHTML = '00.00';
    discountLabel.innerHTML = '%';
    balanceLabel.innerHTML = 'Balance';

    receiptContent.innerHTML = '';
    receiptTotal.innerHTML = '';
    receiptSubTotal.innerHTML = '';
    receiptDiscount.innerHTML = '';
    receiptBalance.innerHTML = '';
};
function showCashBalance(){
    alert(`Cash Drawer Balance: Rs.${cash_balance}`);
};
function cashInToDrawer(){
    let cashAmount = prompt("Add Amount(Rs.): ");

    data = {
        cashAmount,
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
    };
    $.ajax({
        type: "POST", url: "/frontend/drawerAdd/",
        data: data,
        success: function (response) {
            if (response == 'failed') {
                alert('FAILURE');
            }else{
                cash_balance = Number(response);
                alert('Cash Added Success!');
            };
        }
    });
};

function cashOutOfDrawer(){
    let cashAmount = prompt("Draw Amount(Rs.): ");

    data = {
        cashAmount,
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
    };
    $.ajax({
        type: "POST", url: "/frontend/drawerOut/",
        data: data,
        success: function (response) {
            if (response == 'failed') {
                alert('FAILURE');
            }else{
                cash_balance = Number(response);
                alert('Cash Drawn Success!');
            };
        }
    });
};
// SHORTCUT Functions
function changeHref(url){
    window.location.replace(url);
}
function navigateTo(url, w, h){
    window.open(url, "_blank", `toolbar=no,scrollbars=no,resizable=yes,top=${(screen.height/2)-(h/2)},left=${(screen.width/2)-(w/2)},width=${w},height=${h}`);
};
function navigate(url){
    window.location.replace(url);;
};
function searchStockWindow(){
    navigateTo("/misc/stock_search/", "600px", "600px");
};
document.addEventListener("keypress", e => e.code == "KeyO" ? window.location.replace('/backend/') : e.code == "KeyE" ? cashInToDrawer() : e.code == "KeyT" ? changeHref('/admin/') : e.code == "KeyR" ? cashOutOfDrawer(): e.code == "KeyW" ? showCashBalance() : e.code == "KeyY" ? changeHref('/misc/') : e.code == "KeyQ" ? window.location.replace('/cashier/logout/') : e.code == "Backquote" ? searchStockWindow() : console.log(e.code));