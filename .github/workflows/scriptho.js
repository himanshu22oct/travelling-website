document.addEventListener("DOMContentLoaded", () => {
    const hotels = [
        { name: "The Grand Palace", location: "Delhi", price: 6000, image: "hotel1.jpeg" },
        { name: "Beachfront Resort", location: "Goa", price: 7500, image: "hotel2.jpeg" },
        { name: "Mountain Escape", location: "Manali", price: 5000, image: "hotel3.jpeg" },
        { name: "Skyline Suites", location: "Mumbai", price: 8000, image: "hotel4.jpeg" },
        { name: "Royal Heritage", location: "Jaipur", price: 6500, image: "hotel5.jpeg" },
        { name: "Lakeside Inn", location: "Udaipur", price: 7000, image: "hotel6.jpeg" },
        { name: "Rainforest Lodge", location: "Coorg", price: 5500, image: "hotel7.jpeg" },
        { name: "Desert Retreat", location: "Jaisalmer", price: 4800, image: "hotel8.jpeg" },
        { name: "Tea Estate Bungalow", location: "Munnar", price: 7200, image: "hotel9.jpeg" },
        { name: "Himalayan Heights", location: "Darjeeling", price: 5800, image: "hotel10.jpeg" },
        { name: "Island Paradise", location: "Andaman", price: 8200, image: "hotel11.jpeg" },
        { name: "Backwater Haven", location: "Kerala", price: 6800, image: "hotel12.jpeg" }
    ];

    const hotelContainer = document.getElementById("hotelContainer");

    // Render hotel listings
    hotels.forEach(hotel => {
        const hotelDiv = document.createElement("div");
        hotelDiv.classList.add("hotel");
        hotelDiv.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <h3>${hotel.name}</h3>
            <p>Location: ${hotel.location}</p>
            <p>Price: ₹${hotel.price} per night</p>
            <button class="book-btn" data-name="${hotel.name}" data-price="${hotel.price}">Book Now</button>
        `;
        hotelContainer.appendChild(hotelDiv);
    });

    // Booking event delegation
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("book-btn")) {
            startBooking(event.target.dataset.name, event.target.dataset.price);
        }
    });

});

// Function to handle booking
const startBooking = (hotelName, hotelPrice) => {
    document.getElementById("selectedHotel").value = hotelName;
    document.getElementById("bookingSection").style.display = "block";
    document.getElementById("totalPrice").innerText = "";
    document.getElementById("selectedHotel").dataset.price = hotelPrice;
};

// Function to calculate total price
const calculateTotal = () => {
    const checkIn = document.getElementById("checkInDate").value;
    const checkOut = document.getElementById("checkOutDate").value;
    const guests = parseInt(document.getElementById("guests").value);
    const hotelPrice = parseInt(document.getElementById("selectedHotel").dataset.price);

    if (!hotelPrice) {
        showError("Please select a hotel first.");
        return;
    }

    if (!checkIn || !checkOut) {
        showError("Please enter valid check-in and check-out dates.");
        return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
        showError("Check-out date must be after check-in date.");
        return;
    }

    if (guests < 1 || isNaN(guests)) {
        showError("Please enter a valid number of guests.");
        return;
    }

    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    const total = hotelPrice * nights * guests;

    document.getElementById("totalPrice").innerText = `Total Price: ₹${total}`;
};

// Function to show error messages
const showError = (message) => {
    document.getElementById("totalPrice").innerText = message;
};

// Function to handle payment method selection
const showPaymentFields = () => {
    const paymentMethod = document.getElementById("payment").value;
    const paymentDetails = document.getElementById("paymentDetails");
    paymentDetails.innerHTML = "";

    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
        paymentDetails.innerHTML = `
            <label for="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" required placeholder="16-digit card number" pattern="[0-9]{16}">
            <label for="cardExpiry">Expiry Date:</label>
            <input type="month" id="cardExpiry" required>
            <label for="cardCVV">CVV:</label>
            <input type="text" id="cardCVV" required placeholder="3-digit CVV" pattern="[0-9]{3}">
        `;
    } else if (paymentMethod === "UPI") {
        paymentDetails.innerHTML = `
            <label for="upiID">UPI ID:</label>
            <input type="text" id="upiID" required placeholder="example@upi">
        `;
    } else if (paymentMethod === "Net Banking") {
        paymentDetails.innerHTML = `
            <label for="bank">Select Bank:</label>
            <select id="bank" required>
                <option value="">Select Bank</option>
                <option value="SBI">SBI</option>
                <option value="HDFC">HDFC</option>
                <option value="ICICI">ICICI</option>
                <option value="Axis">Axis</option>
            </select>
        `;
    }
};
