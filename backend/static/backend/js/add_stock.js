const itemCodeInput = document.getElementsByName('item_code')[0];
const itemNameInput = document.getElementsByName('item_name')[0];
const itemQtyInput = document.getElementsByName('item_qty')[0];
const itemTable = document.getElementById('item_table');
const removeDuplicates = (arr) => [...new Set(arr)];

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
}onLoadLoadValues();

function addItem(){
    items.map
    let book;
    books.map((i) => {if(i.item_code == itemCodeInput.value){book=i}});
    itemInner = `
    <tr>
        <th>${book.item_code}</th>
        <th>${book.title}</th>
        <th>${itemQtyInput.value}</th>
        <th>${book.price}</th>
        <th>${Number(itemQtyInput.value) * Number(book.price)}</th>
    </tr>`;
    itemTable.innerHTML += itemInner;
};