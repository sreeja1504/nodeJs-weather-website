console.log('client side js file is loaded!');
fetch('http://puzzle.mead.io/puzzle')
    .then(response => {
        response.json().then((data) => {
            console.log(data);
        })
    })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
document.querySelector('#send-location').addEventListener('click',(e)=>{
    e.preventDefault();
    if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
    }
    messageOne.textContent = "Loading..";
    messageTwo.textContent = "";

      navigator.geolocation.getCurrentPosition((position) => {
    // fetch('http://localhost:3000/weather-using-button?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response) => {
      fetch('/weather-using-button?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.innerText=data.error;
            } else {
                console.log(data.forecast);
                messageOne.innerText=data.forecast;
    
            }
        })
      })
    
     })

})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = "Loading..";
    messageTwo.textContent = "";

    //  fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    fetch('/weather?address='+search.value).then((response) => {

    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
            messageOne.innerText=data.error;
        } else {
            console.log(data.location);
            console.log(data.forecast);
            messageOne.innerText=data.location;
            messageTwo.innerText=data.forecast;
            // messageOne.textContent= data.location;

        }
    })
})


})