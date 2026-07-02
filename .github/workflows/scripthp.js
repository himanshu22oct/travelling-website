document.addEventListener("DOMContentLoaded", function () {
    const holidays = [
        { 
            name: "Goa Beach Escape", location: "Goa", price: 35000, vehicle: "Flight", 
            activities: ["Beach Party", "Scuba Diving", "Island Tour", "Water Sports", "Night Cruise"],
            stay: "Luxury Resort", food: "Seafood Buffet", image: "goa.jpeg" 
        },
        { 
            name: "Manali Snow Adventure", location: "Manali", price: 30000, vehicle: "Bus", 
            activities: ["Skiing", "Paragliding", "Camping", "Snow Trekking", "Hot Springs Visit"],
            stay: "Mountain Lodge", food: "Local Cuisine", image: "manali.jpeg" 
        },
        { 
            name: "Kerala Backwaters", location: "Alleppey", price: 32000, vehicle: "Train", 
            activities: ["Houseboat Stay", "Fishing", "Cultural Dance", "Temple Visit", "Ayurveda Massage"],
            stay: "Floating Houseboat", food: "South Indian Thali", image: "kerala.jpeg" 
        }
    ];

    const holidayContainer = document.getElementById("holidayContainer");

    holidays.forEach(holiday => {
        let holidayDiv = document.createElement("div");
        holidayDiv.classList.add("holiday");
        holidayDiv.innerHTML = `
            <img src="${holiday.image}" alt="${holiday.name}">
            <h3>${holiday.name}</h3>
            <p>Location: ${holiday.location}</p>
            <p>Vehicle: ${holiday.vehicle}</p>
            <p><strong>Activities:</strong></p>
            <ul>${holiday.activities.map(act => `<li>${act}</li>`).join("")}</ul>
            <p>Stay: ${holiday.stay}</p>
            <p>Food: ${holiday.food}</p>
            <p>Price: ₹${holiday.price} (7 Days)</p>
            <button onclick="selectHoliday('${holiday.name}', ${holiday.price})">Book Now</button>
        `;
        holidayContainer.appendChild(holidayDiv);
    });
});

let selectedHoliday = "";
let holidayPrice = 0;

function selectHoliday(name, price) {
    selectedHoliday = name;
    holidayPrice = price;
    document.getElementById("selectedHoliday").value = name;
}

function calculateTotal() {
    let checkIn = document.getElementById("checkInDate").value;
    let guests = document.getElementById("guests").value;

    if (!selectedHoliday || checkIn === "" || guests < 1) {
        alert("Please fill in all details correctly.");
        return;
    }

    let totalCost = holidayPrice * guests;
    document.getElementById("totalPrice").innerText = `Total Price: ₹${totalCost}`;
}
