document.addEventListener("DOMContentLoaded", function () {
    const homestays = [
        { name: "Luxury Villa", location: "Manali, Himachal Pradesh", price: 5000, image: "homestay1.jpeg" },
        { name: "Beachfront Cottage", location: "Goa", price: 4000, image: "homestay2.jpeg" },
        { name: "Mountain Retreat", location: "Ooty, Tamil Nadu", price: 3500, image: "homestay3.jpeg" },
        { name: "Forest Cabin", location: "Coorg, Karnataka", price: 3800, image: "homestay4.jpeg" },
        { name: "Heritage Mansion", location: "Jaipur, Rajasthan", price: 4500, image: "homestay5.jpeg" },
        { name: "Lake View Resort", location: "Udaipur, Rajasthan", price: 4200, image: "homestay6.jpeg" },
        { name: "Desert Camp", location: "Jaisalmer, Rajasthan", price: 3000, image: "homestay7.jpeg" },
        { name: "Riverfront Cottage", location: "Rishikesh, Uttarakhand", price: 3600, image: "homestay8.jpeg" },
        { name: "Himalayan Retreat", location: "Darjeeling, West Bengal", price: 3900, image: "homestay9.jpeg" },
        { name: "Tea Estate Bungalow", location: "Munnar, Kerala", price: 4300, image: "homestay10.jpeg" },
        { name: "Island Hut", location: "Andaman & Nicobar", price: 5200, image: "homestay11.jpeg" },
        { name: "Backwater Villa", location: "Alleppey, Kerala", price: 4100, image: "homestay12.jpeg" }
    ];

    const homestayContainer = document.getElementById("homestayContainer");

    homestays.forEach(homestay => {
        let homestayDiv = document.createElement("div");
        homestayDiv.classList.add("homestay");
        homestayDiv.innerHTML = `
            <img src="${homestay.image}" alt="${homestay.name}">
            <h3>${homestay.name}</h3>
            <p>Location: ${homestay.location}</p>
            <p>Price: ₹${homestay.price} per night</p>
            <button onclick="selectHomestay('${homestay.name}', ${homestay.price})">Book Now</button>
        `;
        homestayContainer.appendChild(homestayDiv);
    });
});

let selectedHomestay = "";
let perNightPrice = 0;

function selectHomestay(name, price) {
    selectedHomestay = name;
    perNightPrice = price;
    document.getElementById("selectedHomestay").value = name;
}

function calculateTotal() {
    let checkIn = new Date(document.getElementById("checkInDate").value);
    let checkOut = new Date(document.getElementById("checkOutDate").value);
    let guests = document.getElementById("guests").value;

    if (!selectedHomestay || isNaN(checkIn) || isNaN(checkOut) || guests < 1) {
        alert("Please fill in all details correctly.");
        return;
    }

    let days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    let totalCost = days * perNightPrice;

    document.getElementById("totalPrice").innerText = `Total Price: ₹${totalCost}`;
}

function showPaymentFields() {
    let paymentMethod = document.getElementById("payment").value;
    let paymentSection = document.getElementById("paymentDetails");
    paymentSection.innerHTML = "";

    if (paymentMethod.includes("Card")) {
        paymentSection.innerHTML = `
            <label>Card Number:</label>
            <input type="text" placeholder="Enter Card Number">
            <label>Expiry Date:</label>
            <input type="month">
            <label>CVV:</label>
            <input type="text" placeholder="123">
        `;
    } else if (paymentMethod === "UPI") {
        paymentSection.innerHTML = `<label>UPI ID:</label><input type="text" placeholder="example@upi">`;
    } else if (paymentMethod === "Net Banking") {
        paymentSection.innerHTML = `<label>Select Bank:</label><select><option>SBI</option><option>HDFC</option><option>ICICI</option></select>`;
    }
}
