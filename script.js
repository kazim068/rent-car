// script.js
document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('searchForm');
    const carList = document.getElementById('carList');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Simulate fetching car data from a server
        const pickupDate = document.getElementById('pickupDate').value;
        const dropoffDate = document.getElementById('dropoffDate').value;

        // Here you can perform a fetch request to a server to get car data based on pickup and drop-off dates
        // For the sake of this example, let's assume we have some sample car data
        const cars = [
            { make: 'Toyota', model: 'Corolla GLI', year: 2016, pricePerDay: 50 },
            { make: 'Suzuki', model: 'Alto', year: 2020, pricePerDay: 30 },
            { make: 'KIA', model: 'Sportage', year: 2022, pricePerDay: 100 }
        ];

        displayCars(cars);
    });

    function displayCars(cars) {
        carList.innerHTML = ''; // Clear previous car listings

        cars.forEach(car => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.setAttribute('data-make', car.make); // Set data-make attribute

            carItem.innerHTML = `
                <h3>${car.make} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Price per Day: $${car.pricePerDay}</p>
                <button onclick="rentCar('${car.make}', '${car.model}')">Rent Now</button>
            `;

            carList.appendChild(carItem);
        });

        setCarImages(); // Call function to set car images
    }

    function rentCar(make, model) {
        alert(`You have rented the ${make} ${model}. Enjoy your ride!`);
    }

    function setCarImages() {
        const carItems = document.querySelectorAll('.car-item');

        carItems.forEach(carItem => {
            const make = carItem.getAttribute('data-make');

            if (make === 'Toyota') {
                carItem.style.backgroundImage = 'url("https://unsplash.com/photos/silver-sports-coupe-on-asphalt-road-ZRns2R5azu0")';
            } else if (make === 'Suzuki') {
                carItem.style.backgroundImage = 'url("https://unsplash.com/photos/silver-sports-coupe-on-asphalt-road-ZRns2R5azu0")';
                
            }
               else if (make === 'KIA') {
                carItem.style.backgroundImage = 'url("https://unsplash.com/photos/silver-sports-coupe-on-asphalt-road-ZRns2R5azu0")';    
            }
            // Add more else-if conditions for other car makes if needed
        });
    }
});
// server.js

const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rent a car endpoint
app.post('/rent', async (req, res) => {
    const { carMake, carModel, pickupDate, dropoffDate, amount } = req.body;

    try {
        // Process payment using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert amount to cents
            currency: 'usd', // Assuming payment in USD, you can change it to PKR
            description: `Renting ${carMake} ${carModel}`,
            payment_method: 'pm_card_visa', // Example payment method (can be replaced with actual payment method)
            confirm: true,
        });

        // Rent car logic (e.g., store rental details in database)
        // ...

        res.status(200).json({ message: 'Car rented successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while renting the car.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
