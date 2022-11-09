let itemCodeInput = document.getElementsByName('item_code')[0];
let isbnNumberInput = document.getElementsByName('isbn_number')[0];
let priceInput = document.getElementsByName('price')[0];
let publisherInput = document.getElementsByName('publisher')[0];
let titleInput = document.getElementsByName('title')[0];
let authorInput = document.getElementsByName('author')[0];
let bookTypeInput = document.getElementsByName('booktype')[0];

const removeDuplicates = (arr) => [...new Set(arr)];
const getCSRFTokenValue = () => document.getElementsByName('csrfmiddlewaretoken')[0].value;
const windowClose = () => window.close();
const inputsAllFilled = () => itemCodeInput.value && isbnNumberInput.value && priceInput.value && publisherInput.value && titleInput.value && authorInput.value && bookTypeInput.value ? true : false;
function clearInputs(){itemCodeInput.value = '';isbnNumberInput.value = '';priceInput.value = '';publisherInput.value = '';titleInput.value = '';authorInput.value = '';bookTypeInput.value = '';itemCodeInput.focus();};

function saveItem(){
    data = {
        item_code: itemCodeInput.value, 
        isbn_no: isbnNumberInput.value, 
        price: priceInput.value,
        publisher: publisherInput.value,
        title: titleInput.value,
        author: authorInput.value,
        book_type: bookTypeInput.value,
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/item/save/",
        data: data,
        success: function(response) {
            if(response == "success") {
                items.push(data);
                console.log(items);
                onLoadLoadValues();
                clearInputs();
            }
        }
    });
};
function onLoadLoadValues(){
    // Item Codes
    let itemCodes = document.getElementById('item_codes');
    let itemCodesInner = '';
    let itemCodeArray = items.map(({ item_code }) => item_code);
    itemCodeArray = removeDuplicates(itemCodeArray);
    for (let i of itemCodeArray){
        itemCodesInner += `<option value="${i}">`;
    };
    itemCodes.innerHTML = itemCodesInner;
    // ISBN No
    let isbnNo = document.getElementById('isbn_number');
    let isbnNoInner = '';
    let isbnNoArray = items.map(({ isbn_no }) => isbn_no);
    isbnNoArray = removeDuplicates(isbnNoArray);
    for (let i of isbnNoArray){
        isbnNoInner += `<option value="${i}">`;
    };
    isbnNo.innerHTML = isbnNoInner;
    // Title
    let title = document.getElementById('title');
    let titleInner = '';
    let titleArray = items.map(({ title }) => title);
    for (let i of titleArray){
        titleInner += `<option value="${i}">`;
    };
    title.innerHTML = titleInner;
    // Publisher
    let publisher = document.getElementById('publisher');
    let publisherInner = '';
    let publisherArray = items.map(({ publisher }) => publisher);
    publisherArray = removeDuplicates(publisherArray);
    for (let i of publisherArray){
        publisherInner += `<option value="${i}">`;
    };
    publisher.innerHTML = publisherInner;
    // Author
    let author = document.getElementById('author');
    let authorInner = '';
    let authorArray = items.map(({ author }) => author);
    authorArray = removeDuplicates(authorArray);
    for (let i of authorArray){
        authorInner += `<option value="${i}">`;
    };
    author.innerHTML = authorInner;
    // Book Type
    let bookType = document.getElementById('booktype');
    let bookTypeInner = '';
    let bookTypeArray = items.map(({ book_type }) => book_type);
    bookTypeArray = removeDuplicates(bookTypeArray);
    for (let i of bookTypeArray){
        bookTypeInner += `<option value="${i}">`
    };
    bookType.innerHTML = bookTypeInner;
}onLoadLoadValues();

function titleSelected(){
    let title = titleInput.value;
    let item;
    items.map((i) => {
        if (i.title == title){
            item = i;
        };
    });
    // Setting the Values to the Inputs
    itemCodeInput.value = item.item_code;
    isbnNumberInput.value = item.isbn_no;
    priceInput.value = item.price;
    publisherInput.value = item.publisher;
    authorInput.value = item.author;
    bookTypeInput.value = item.book_type;
};
function isbnNoSelected(){
    let isbnNo = isbnNumberInput.value;
    let item;
    items.map((i) => {
        if (i.isbn_no == isbnNo){
            item = i;
        };
    });
    // Setting the Values to the Inputs
    itemCodeInput.value = item.item_code;
    titleInput.value = item.title;
    priceInput.value = item.price;
    publisherInput.value = item.publisher;
    authorInput.value = item.author;
    bookTypeInput.value = item.book_type;
};
function itemCodeSelected(){
    let itemCode = itemCodeInput.value;
    let item;
    items.map((i) => {
        if (i.item_code == itemCode){
            item = i;
        };
    });
    // Setting the Values to the Inputs
    titleInput.value = item.title;
    isbnNumberInput.value = item.isbn_no;
    priceInput.value = item.price;
    publisherInput.value = item.publisher;
    authorInput.value = item.author;
    bookTypeInput.value = item.book_type;
};
function deleteItem(){
    let item_code = itemCodeInput.value;
    data = {
        item_code, 
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/item/delete/",
        data: data,
        success: function(response) {
            if(response == "success") {
                items = items.filter((i) => i.item_code != item_code);
                onLoadLoadValues();
                clearInputs();
            }
        }
    });
};
function updateItem(){
    if (inputsAllFilled()){
        data = {
            item_code: itemCodeInput.value, 
            isbn_no: isbnNumberInput.value, 
            price: priceInput.value,
            publisher: publisherInput.value,
            title: titleInput.value,
            author: authorInput.value,
            book_type: bookTypeInput.value,
            csrfmiddlewaretoken: getCSRFTokenValue()
        };
        $.ajax({ type: "POST", url: "/backend/item/update/",
            data: data,
            success: function(response) {
                if(response == "success") {
                    onLoadLoadValues();
                    clearInputs();
                }
            }
        });
    };
};