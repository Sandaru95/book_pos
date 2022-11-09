const authorNameInput = document.getElementsByName('author_name')[0];
const authorTelInput = document.getElementsByName('author_tel')[0];

const removeDuplicates = (arr) => [...new Set(arr)];
const getCSRFTokenValue = () => document.getElementsByName('csrfmiddlewaretoken')[0].value;
const windowClose = () => window.close();
const inputsAllFilled = () => authorNameInput.value && authorTelInput.value ? true : false;
function clearInputs(){authorNameInput.value = '';authorTelInput.value = '';};

function saveAuthor(){
    data = {
        name: authorNameInput.value, 
        tel: authorTelInput.value, 
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/author/save/",
        data: data,
        success: function(response) {
            if(response == "success") {
                authors.push(data);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};
function deleteAuthor(){
    data = {
        name: authorNameInput.value, 
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/author/delete/",
        data: data,
        success: function(response) {
            if(response == "success") {
                authors = authors.filter((i) => i.name != data.name);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};

function updateAuthor(){
    if (inputsAllFilled()){
        data = {
            name: authorNameInput.value, 
            tel: authorTelInput.value, 
            csrfmiddlewaretoken: getCSRFTokenValue()
        };
        $.ajax({ type: "POST", url: "/backend/author/update/",
            data: data,
            success: function(response) {
                if(response == "success") {
                    clearInputs();
                    onLoadLoadValues();
                }
            }
        });
    };
};
function onLoadLoadValues(){
    // Name
    let authorName = document.getElementById('author_name');
    let authorNameInner = '';
    let authorNameArray = authors.map(({ name }) => name);
    authorNameArray = removeDuplicates(authorNameArray);
    for (let i of authorNameArray){
        authorNameInner += `<option value="${i}">`;
    };
    authorName.innerHTML = authorNameInner;
}onLoadLoadValues();

function authorNameSelected(){
    let name = authorNameInput.value;
    let author;
    authors.map((i) => {
        if (i.name == name){
            author = i;
        };
    });
    // Setting the Values to the Inputs
    authorTelInput.value = author.tel;
};