const locationInput = document.getElementsByName('location')[0];

function onLoadLoadValues(){
    // Name
    let location = document.getElementById('location');
    let locationInner = '';
    let locationArray = locations.map(({ name }) => name);
    for (let i of locationArray){
        locationInner += `<option value="${i}">`;
    };
    location.innerHTML = locationInner;
}onLoadLoadValues();

function viewBalance(){
    let location;
    locations.map(l => l.name == locationInput.value ? location = l: location=location);
    let w = 1000;
    let h = 800
    window.open(`/backend/stock_balance/${location.pk}/`, "_blank", `toolbar=no,scrollbars=no,resizable=yes,top=${(screen.height/2)-(h/2)},left=${(screen.width/2)-(w/2)},width=${w},height=${h}`);
};