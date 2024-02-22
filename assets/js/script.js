// variables
let availableSeats = 40;
let selectedSeats = 0;
let totalPrice = 0;
let grandPrice = 0;
let perTicket = 550;
let myCoupons = ["NEW15", "Couple 20"];
let couponApplied = false;

// update available seats
function updateSeatCount() {
    availableSeats--;
    selectedSeats++;
    document.getElementById("available-seats").innerText = availableSeats;
    document.getElementById("selected-seats").innerText = selectedSeats;
}

// update Price
function updatePrice() {
    totalPrice += perTicket;
    grandPrice += perTicket;
    document.getElementById("total-price").innerText = totalPrice;
    document.getElementById("grand-price").innerText = grandPrice;
}

// update ticket list
function updateTicket(element) {
    element.style.backgroundColor = "#1DD100";
    let tickets = document.querySelectorAll(".selected-ticket");
    tickets[selectedSeats].childNodes[1].innerText = element.id;
    tickets[selectedSeats].classList.remove("hidden");
    console.log(tickets[selectedSeats].childNodes[1].classList);
}

// add event for selecting seats
let allSeats = document.querySelectorAll(".seat-plan");

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

function discount(percentage) {
    couponApplied = true;
    grandPrice -= percentage * grandPrice;
    document.getElementById("grand-price").innerText = grandPrice;
    document.getElementById("coupon-segment").classList.add("hidden");
}

// input coupon
document.getElementById("coupon").addEventListener("keyup", (e) => {
    let inputCoupon = e.target.value;
    console.log(inputCoupon);
    if (couponApplied === false && selectedSeats === 4) {
        if (myCoupons.indexOf(inputCoupon) > -1) {
            document
                .getElementById("coupon-apply")
                .classList.remove("btn-disabled");

            console.log(inputCoupon);

            document
                .getElementById("coupon-apply")
                .addEventListener("click", () => {
                    let percentage = 0.15;
                    if (!couponApplied) {
                        if (inputCoupon === myCoupons[0]) {
                            discount(percentage);
                        } else if (inputCoupon === myCoupons[1]) {
                            percentage = 0.2;
                            discount(percentage);
                        }
                    }
                });
        }
    }
});

// process next and show modal
document.getElementById("btn-next").addEventListener("click", () => {
    if (selectedSeats > 0) {
        document.getElementById("page-header").classList.add("hidden");
        document.getElementById("page-main").classList.add("hidden");
        document.getElementById("page-footer").classList.add("hidden");
        document.getElementById("page-modal").classList.remove("hidden");
    }
});

// reload on continue
document.getElementById("page-reload").addEventListener("click", () => {
    location.reload();
});
