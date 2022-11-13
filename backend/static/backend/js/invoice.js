const publisherInput = document.getElementsByName('publisher')[0];
const invoiceInput = document.getElementsByName('invoice')[0];

const itemCodeInput = document.getElementsByName('item_code')[0];
const itemNameInput = document.getElementsByName('item_name')[0];
const itemQtyInput = document.getElementsByName('item_qty')[0];
const itemTable = document.getElementById('item_table');
const itemTableBody = document.getElementById('item_table_body');

const discountInput = document.getElementsByName('discount')[0];
const totalInput = document.getElementsByName('total')[0];
const subTotalInput = document.getElementsByName('subtotal')[0];

const removeDuplicates = (arr) => [...new Set(arr)];
const getCSRFTokenValue = () => document.getElementsByName('csrfmiddlewaretoken')[0].value;

function updateTotals(){
    let subtotal = 0;
    let total = 0;
    items.map(i => subtotal += Number(i.qty) * Number(i.price));
    if (discountInput.value){
        total = subtotal * (100-Number(discountInput.value))/100;
    }else{
        total = subtotal * 0.8;
    };
    subTotalInput.value = subtotal;
    totalInput.value = total;
};

function clearInputs(){
    itemCodeInput.value = '';
    itemNameInput.value = '';
    itemQtyInput.value = '';
    itemCodeInput.focus();updateTotals();
};
function itemAlreadyPresent(){
    let present = false;
    for(let i of items){
        if (i.item_code == itemCodeInput.value){
            present = true
        }
    };
    return present;
};
function itemCodeSelected(){
    let itemCode = itemCodeInput.value;
    let book;
    books.map((i) => {
        if (i.item_code == itemCode){
            book = i;
        };
    });
    // Setting the Values to the Inputs
    itemNameInput.value = book.title;
    itemQtyInput.focus()
};
function onLoadLoadValues(){
    // Item Codes
    let itemCode = document.getElementById('item_code');
    let itemCodeInner = '';
    let itemCodeArray = books.map(({ item_code }) => item_code);
    itemCodeArray = removeDuplicates(itemCodeArray);
    for (let i of itemCodeArray){
        itemCodeInner += `<option value="${i}">`;
    };
    itemCode.innerHTML = itemCodeInner;
    // Publisher
    let publisher = document.getElementById('publisher');
    let publisherInner = '';
    let publisherArray = publishers.map(({ name }) => name);
    for (let i of publisherArray){
        publisherInner += `<option value="${i}">`;
    };
    publisher.innerHTML = publisherInner;
}onLoadLoadValues();

function addItem(){
    // IF ITEM ALREADY PRESENTS
    if (itemAlreadyPresent()){
        Swal.fire({
            title: 'Item already added. Proceed?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Add',
            denyButtonText: `Remove`,
        }).then((result) => {
            if (result.isConfirmed) {
                items.map(i => i.item_code == itemCodeInput.value ? i.qty = String(Number(i.qty) + Number(itemQtyInput.value)) : i.qty);renderItemsToTable();
                Swal.fire('Item Added!', '', 'success');clearInputs();

            }else if (result.isDenied) {
                items.map((i) => {
                    if(i.item_code == itemCodeInput.value) {
                        i.qty = Number(i.qty) - Number(itemQtyInput.value);
                        if (!i.qty){
                            items.splice(items.indexOf(i), 1);
                        };
                    };
                });renderItemsToTable();
                Swal.fire('Item Removed!', '', 'info');clearInputs();
            }
        });
    // IF ITEM NOT PRESENTS
    }else{
        let book;
        books.map((i) => {
            if(i.item_code == itemCodeInput.value){
                book = i;
            };
        });
        book['qty'] = itemQtyInput.value;
        items.push(book);
        renderItemsToTable();
        clearInputs();
    };
};

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
};
function saveStock(){
    data = {
        items: JSON.stringify(items),
        publisher: publisherInput.value,
        invoice: invoiceInput.value,
        subtotal: subTotalInput.value,
        discount: discountInput.value,
        total: totalInput.value,
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/invoice/save/",
        data: data,
        success: function(response) {
            if(response == "success") {
                Swal.fire('Inquiry Posted!', '', 'success');
            }
        }
    });
};