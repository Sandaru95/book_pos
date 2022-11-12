const bookTypeNameInput = document.getElementsByName('book_type_name')[0];

const removeDuplicates = (arr) => [...new Set(arr)];
const getCSRFTokenValue = () => document.getElementsByName('csrfmiddlewaretoken')[0].value;
const windowClose = () => window.close();
const inputsAllFilled = () => bookTypeNameInput.value ? true : false;
function clearInputs(){bookTypeNameInput.value = '';};

function saveBookType(){
    data = {
        name: bookTypeNameInput.value,
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/book_type/save/",
        data: data,
        success: function(response) {
            if(response == "success") {
                book_types.push(data);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};
function deleteBookType(){
    data = {
        name: bookTypeNameInput.value, 
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/book_type/delete/",
        data: data,
        success: function(response) {
            if(response == "success") {
                book_types = book_types.filter((i) => i.name != data.name);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};
function onLoadLoadValues(){
    // Name
    let bookTypeName = document.getElementById('book_type_name');
    let bookTypeNameInner = '';
    let bookTypeNameArray = book_types.map(({ name }) => name);
    bookTypeNameArray = removeDuplicates(bookTypeNameArray);
    for (let i of bookTypeNameArray){
        bookTypeNameInner += `<option value="${i}">`;
    };
    bookTypeName.innerHTML = bookTypeNameInner;
}onLoadLoadValues();