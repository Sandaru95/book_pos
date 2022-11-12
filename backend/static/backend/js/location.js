const locationNameInput = document.getElementsByName('location_name')[0];

const removeDuplicates = (arr) => [...new Set(arr)];
const getCSRFTokenValue = () => document.getElementsByName('csrfmiddlewaretoken')[0].value;
const windowClose = () => window.close();
const inputsAllFilled = () => locationNameInput.value ? true : false;
function clearInputs(){locationNameInput.value = '';};

function saveLocation(){
    data = {
        name: locationNameInput.value,
        csrfmiddlewaretoken: getCSRFTokenValue()
    };
    $.ajax({ type: "POST", url: "/backend/location/save/",
        data: data,
        success: function(response) {
            if(response == "success") {
                locations.push(data);
                clearInputs();
                onLoadLoadValues();
            }
        }
    });
};
function onLoadLoadValues(){
    // Name
    let locationName = document.getElementById('location_name');
    let locationNameInner = '';
    let locationNameArray = locations.map(({ name }) => name);
    locationNameArray = removeDuplicates(authorNameArray);
    for (let i of locationNameArray){
        locationNameInner += `<option value="${i}">`;
    };
    locationName.innerHTML = locationNameInner;
}onLoadLoadValues();