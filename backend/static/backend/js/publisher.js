const publisherNameInput = document.getElementsByName('publisher_name')[0];
const publisherTelInput = document.getElementsByName('publisher_tel')[0];
const publisherAddressInput = document.getElementsByName('publisher_address')[0];

const removeDuplicates = (arr) => [...new Set(arr)];
const getCSRFTokenValue = () => document.getElementsByName('csrfmiddlewaretoken')[0].value;
const windowClose = () => window.close();
const inputsAllFilled = () => publisherNameInput.value && publisherTelInput.value && publisherAddressInput.value  ? true : false;
function clearInputs(){publisherNameInput.value = '';publisherTelInput.value = '';publisherAddressInput.value='';};

function savePublisher(){
    data = {
        name: publisherNameInput.value, 
        tel: publisherTelInput.value,
        address:  publisherAddressInput.value,
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/publisher/save/",
        data: data,
        success: function(response) {
            if(response == "success") {
                publishers.push(data);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};
function deletePublisher(){
    data = {
        name: publisherNameInput.value, 
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/publisher/delete/",
        data: data,
        success: function(response) {
            if(response == "success") {
                publishers = publishers.filter((i) => i.name != data.name);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};

function updatePublisher(){
    if (inputsAllFilled()){
        data = {
            name: publisherNameInput.value, 
            tel: publisherTelInput.value, 
            address: publisherAddressInput.value,
            csrfmiddlewaretoken: getCSRFTokenValue()
        };
        $.ajax({ type: "POST", url: "/backend/publisher/update/",
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
    let publisherName = document.getElementById('publisher_name');
    let publisherNameInner = '';
    let publisherNameArray = publishers.map(({ name }) => name);
    publisherNameArray = removeDuplicates(publisherNameArray);
    for (let i of publisherNameArray){
        publisherNameInner += `<option value="${i}">`;
    };
    publisherName.innerHTML = publisherNameInner;
}onLoadLoadValues();

function publisherNameSelected(){
    let name = publisherNameInput.value;
    let publisher;
    publishers.map((i) => {
        if (i.name == name){
            publisher = i;
        };
    });
    // Setting the Values to the Inputs
    publisherTelInput.value = publisher.tel;
    publisherAddressInput.value = publisher.address;
};