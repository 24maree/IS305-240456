/*
Program: Dining Meal Booking Feature
Student Name: Mareerose Possi
Student ID: 240456
Date: 17 July 2026
Description: A JavaScript program demonstrating classes,
objects, constructors, private fields and methods.
*/

const MealBooking = require("./MealBooking");

// Create a MealBooking object
const booking1 = new MealBooking({
    studentId: "240456",
    studentName: "Mareerose Possi",
    mealDate: "2026-07-21",
    mealType: "Lunch",
    quantity: 2,
    dietaryNote: "No seafood"
});

// Call the object's methods and display the results
console.log(booking1.getSummary());
console.log(`Calculated Total: K${booking1.calculateTotal().toFixed(2)}`);

// A second object, to show the class working with different data
const booking2 = new MealBooking({
    studentId: "240987",
    studentName: "Julie Pokaran Vue",
    mealDate: "2026-07-22",
    mealType: "Dinner",
    quantity: 1,
    dietaryNote: ""
});

console.log(booking2.getSummary());
console.log(`Calculated Total: K${booking2.calculateTotal().toFixed(2)}`);