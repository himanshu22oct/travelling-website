document.addEventListener("DOMContentLoaded", function () {
    const villas = [
        { name: "Ocean View Villa", location: "Goa", price: 8000, image: "villa1.jpg" },
        { name: "Mountain Escape", location: "Manali", price: 7500, image: "villa2.jpg" },
        { name: "Private Pool Villa", location: "Lonavala", price: 9000, image: "villa3.jpg" },
        { name: "Luxury Retreat", location: "Jaipur", price: 8500, image: "villa4.jpg" },
        { name: "Lake House", location: "Udaipur", price: 7000, image: "villa5.jpg" },
        { name: "Tropical Paradise", location: "Kerala", price: 9500, image: "villa6.jpg" },
        { name: "Hillside Mansion", location: "Shimla", price: 8700, image: "villa7.jpg" },
        { name: "Royal Heritage", location: "Rajasthan", price: 10000, image: "villa8.jpg" }
    ];

    const villaContainer = document.getElementById("villaContainer");

    villas.forEach(villa => {
        let villaDiv = document.createElement("div");
        villaDiv.classList.add("villa");
        villaDiv.innerHTML = `
            <img src="${villa.image}" alt="${villa.name}">
            <h3>${villa.name}</h3>
            <p>Location: ${villa.location}</p>
            <p>Price: ₹${villa.price} per night</p>
            <button onclick="selectVilla('${villa.name}', ${villa.price})">Book Now</button>
        `;
        villaContainer.appendChild(villaDiv);
    });
});

let selectedVilla = "";
let perNightPrice = 0;

function selectVilla(name, price) {
    selectedVilla = name;
    perNightPrice = price;
    document.getElementById("selectedVilla").value = name;
}

function calculateTotal() {
    let checkIn = new Date(document.getElementById("checkInDate").value);
    let checkOut = new Date(document.getElementById("checkOutDate").value);
    let guests = document.getElementById("guests").value;

    if (!selectedVilla || isNaN(checkIn) || isNaN(checkOut) || guests < 1) {
        alert("Please fill in all details correctly.");
        return;
    }

    let days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    let totalCost = days * perNightPrice;

    document.getElementById("totalPrice").innerText = `Total Price: ₹${totalCost}`;
}
