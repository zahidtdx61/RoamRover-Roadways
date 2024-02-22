// variables
let availableSeats = 40;
let selectedSeats = 0;
let totalPrice = 0;
let grandPrice = 0;
let perTicket = 550;

// update available seats
function updateSeatCount() {
    availableSeats--;
    selectedSeats++;
    document.getElementById("available-seats").innerText = availableSeats;
}

// update Price
function updatePrice() {
    totalPrice += perTicket;
    grandPrice += perTicket;
    document.getElementById("total-price").innerText = totalPrice;
    document.getElementById("grand-price").innerText = totalPrice;
}

console.log(document.getElementById("available-seats").innerText);

// update ticket list
function updateTicket(element) {
    element.style.backgroundColor = "#1DD100";
    let tickets = document.querySelectorAll(".selected-ticket");
    tickets[selectedSeats].childNodes[1].innerText = element.id;
    tickets[selectedSeats].classList.remove("hidden");
    console.log(tickets[selectedSeats].childNodes[1].classList);
}

// get seat plan
let allSeats = document.querySelectorAll(".seat-plan");
console.log(allSeats);
for (let i = 0; i < allSeats.length; i++) {
    allSeats[i].addEventListener("click", (e) => {
        if (selectedSeats < 4) {            
            updatePrice();
            updateTicket(allSeats[i]);
            updateSeatCount();
        } else {
            alert("You can't select more than 4 seats");
        }
    });
}

// tickets and price
// let tickets = document.querySelectorAll(".selected-ticket");
// for (let ticket of tickets) {
//     console.log("----------", ticket, "--------------");
//     let ticketId = ticket.childNodes[1].innerText;
//     let ticketClass = ticket.childNodes[3].innerText;
//     let ticketPrice = ticket.childNodes[5].innerText;
// }
