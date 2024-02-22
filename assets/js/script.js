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
    // console.log(tickets[selectedSeats].childNodes[1].classList);
}

// enable next
function enableBtn(id) {
    document.getElementById(id).classList.remove("btn-disabled");
}

// disable next
function disableBtn(id) {
    document.getElementById(id).classList.add("btn-disabled");
}

// get phone number
function getValue(id) {
    return document.getElementById(id).value;
}

// add event for selecting seats
let allSeats = document.querySelectorAll(".seat-plan");

for (let i = 0; i < allSeats.length; i++) {
    allSeats[i].addEventListener("click", (e) => {
        if (selectedSeats < 4) {
            updatePrice();
            updateTicket(allSeats[i]);
            updateSeatCount();
            let addedCoupon = getValue("coupon");
            if (selectedSeats === 4 && myCoupons.indexOf(addedCoupon) > -1) {
                enableBtn("coupon-apply");
            }
            // console.log(getValue("phone").length);
            if (getValue("phone").length > 0) enableBtn("btn-next");
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
    let inputCoupon = getValue("coupon");
    if (
        couponApplied === false &&
        selectedSeats === 4 &&
        myCoupons.indexOf(inputCoupon) > -1
    ) {
        enableBtn("coupon-apply");
    } else {
        if (
            !document
                .getElementById("coupon-apply")
                .classList.contains("btn-disabled")
        ) {
            document
                .getElementById("coupon-apply")
                .classList.add("btn-disabled");
        }
    }
});

// apply coupon
document.getElementById("coupon-apply").addEventListener("click", () => {
    let percentage = 0.15;
    let inputCoupon = getValue("coupon");
    if (!couponApplied) {
        if (inputCoupon === myCoupons[0]) {
            discount(percentage);
        } else if (inputCoupon === myCoupons[1]) {
            percentage = 0.2;
            discount(percentage);
        }
    }
});

// enable next
document.getElementById("phone").addEventListener("keyup", (e) => {
    if (getValue("phone").length > 0 && selectedSeats > 0) {
        enableBtn("btn-next");
    } else if (getValue("phone").length < 1 || selectedSeats < 0) {
        disableBtn("btn-next");
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
