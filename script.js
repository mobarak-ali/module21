// Handlign Ticket Booking 
function handleTicketBooking(ticketClass, addTicket) {

    const ticketInput = document.getElementById(ticketClass + '-class');

    const ticketCount = getTicketInput(ticketClass);

    let newTicketCount = ticketCount;

    if (addTicket == true) {
        newTicketCount = ticketCount + 1;
    }
    if (addTicket == false && ticketCount) {
        newTicketCount = ticketCount - 1;
    }

    ticketInput.value = newTicketCount;

    // Calculating Ticket Price
    calculateTicketPrice();

    //Contorlling Booking Btn Visibility
    bookingBtn();
}


// calculate ticket Price
function calculateTicketPrice() {
    const firsClassTicket = getTicketInput('first');
    const economyClassTicet = getTicketInput('economy');

    // calculatin Subtotal Price
    const subTotal = firsClassTicket * 150 + economyClassTicet * 100;
    document.getElementById('subtotal').innerText = '$' + subTotal;

    // calcualting Vat
    const vatCharge = Math.round(subTotal * 0.1); // 10% vat Charge
    document.getElementById('vat-charge').innerText = '$' + vatCharge;

    // calcualting Total Price
    const totalPrice = subTotal + vatCharge;
    document.getElementById('total').innerText = '$' + totalPrice;


    //update Price at 'Booking Success' Section
    ////////////////////////////////////////////
    // Total first-class-ticket
    document.getElementById('first-class-ticket').innerText = firsClassTicket;
    // first-class-price
    document.getElementById('first-class-price').innerText = '$' + firsClassTicket * 150;

    // Total economy-class-ticket
    document.getElementById('economy-class-ticket').innerText = economyClassTicet;
    // economy-class-price
    document.getElementById('economy-class-price').innerText = '$' + economyClassTicet * 100;

    // Total Tickets
    document.getElementById('total-ticket').innerText = firsClassTicket + economyClassTicet;

    // subtotal Price
    document.getElementById('subtotal-price').innerText = '$' + subTotal;
    // Vat Charge
    document.getElementById('applied-vat').innerText = '$' + vatCharge;
    // Grand Total
    document.getElementById('grand-total').innerText = '$' + totalPrice;

}



// Selecting Ticket Input Value and return as Integer
function getTicketInput(ticketClass) {
    const ticketInputValue = document.getElementById(ticketClass + '-class');
    const ticketCount = parseInt(ticketInputValue.value);
    return ticketCount;
}



//"Book Now" button visibility, if any Tickets are added for Booking
function bookingBtn() {
    const bookNowBtn = document.getElementById('book-now');
    const firstClassTicket = document.getElementById('first-class').value;
    const economyClassTicket = document.getElementById('economy-class').value;
    const ticketCount = firstClassTicket + economyClassTicket;
    const warning = document.getElementById('warning');


    // Applying condition on 'Book Now' Button's Visibility 
    // based on Tickets selected for booking 
    if (ticketCount > 0) {
        bookNowBtn.style.cursor = "pointer";
        bookNowBtn.style.opacity = "1";
        warning.style.display = 'none';
    } else {
        bookNowBtn.style.cursor = "not-allowed";
        bookNowBtn.style.opacity = "0.25"
        warning.style.display = 'block';
    }
}

///
function bookNow() {
    const bookNowBtn = document.getElementById('book-now');

    const opacity = parseFloat(bookNowBtn.style.opacity);

    if (opacity == 1) {
        document.querySelector('.booking-form').style.visibility = "hidden";
        document.querySelector('.booking-success').style.display = "block";
    } else {
        document.getElementById('warning').innerText = "Please add your ticket first!";
    }

}

/// Working with Date Value
function filterDate(e) {
    const getId = e.target.getAttribute('id');
    const setDate = e.target.value;
    const departureDate = document.getElementById("departure");
    const returnDate = document.getElementById("return");

    if (getId == 'departure') {
        returnDate.setAttribute("min", setDate);
    } else {
        departureDate.setAttribute("max", setDate);
    }
}


// This code executes on Load//

// You can not select a date before Today!
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("departure").setAttribute("min", today);
document.getElementById("return").setAttribute("min", today);