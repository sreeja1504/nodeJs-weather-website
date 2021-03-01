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

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = "Loading..";
    messageTwo.textContent = "";

    // fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
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