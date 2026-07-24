/*
Program: Dining Meal Booking Feature
Student Name: Mareerose Possi
Student ID: 240456
Date: 17 July 2026
Description: A JavaScript program demonstrating classes,
objects, constructors, private fields and methods.
*/

// Meal prices in Kina (K), keyed by meal type
const MEAL_PRICES = {
    Breakfast: 10.00,
    Lunch: 15.00,
    Dinner: 20.00
};

//Declaring a class named MealBooking
class MealBooking {
    // Private fields - protect the internal state of a booking
    #studentId;
    #studentName;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #bookingStatus;

    //A constructor that receives the booking information and stores it in the appropriate fields.
    constructor({ studentId, studentName, mealDate, mealType, quantity, dietaryNote }) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.mealDate = mealDate;
        this.mealType = mealType;
        this.quantity = quantity;
        this.dietaryNote = dietaryNote;

        // Every new booking starts as Pending
        this.#bookingStatus = "Pending";
    } 

    //Getters and Setters: 

    // ----- studentId -----
    get studentId() {
        return this.#studentId;
    }

    set studentId(value) {
        if (!value || value.toString().trim() === "") {
            throw new Error("Student ID is required.");
        }
        this.#studentId = value.toString().trim();
    }

    // ----- studentName -----
    get studentName() {
        return this.#studentName;
    }

    set studentName(value) {
        if (!value || value.trim() === "") {
            throw new Error("Student name is required.");
        }
        this.#studentName = value.trim();
    }

    // ----- mealDate -----
    get mealDate() {
        return this.#mealDate;
    }

    set mealDate(value) {
        if (!value || value.trim() === "") {
            throw new Error("Meal date is required.");
        }
        this.#mealDate = value.trim();
    }

    // ----- mealType -----
    get mealType() {
        return this.#mealType;
    }

    set mealType(value) {
        const validTypes = Object.keys(MEAL_PRICES);
        if (!validTypes.includes(value)) {
            throw new Error(`Meal type must be one of: ${validTypes.join(", ")}`);
        }
        this.#mealType = value;
    }

    // ----- quantity -----
    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        const numericValue = Number(value);
        if (!Number.isInteger(numericValue) || numericValue <= 0) {
            throw new Error("Quantity must be a whole number greater than 0.");
        }
        this.#quantity = numericValue;
    }

    // ----- dietaryNote -----
    get dietaryNote() {
        return this.#dietaryNote;
    }

    set dietaryNote(value) {
        // Dietary note is optional, default to "None" if not provided
        this.#dietaryNote = value && value.trim() !== "" ? value.trim() : "None";
    }

    // ----- bookingStatus -----
    get bookingStatus() {
        return this.#bookingStatus;
    }

    set bookingStatus(value) {
        const validStatuses = ["Pending", "Confirmed", "Cancelled"];
        if (!validStatuses.includes(value)) {
            throw new Error(`Booking status must be one of: ${validStatuses.join(", ")}`);
        }
        this.#bookingStatus = value;
    }

    //Calculating the total and getiing the summary
    
    // Multiply the meal price by the quantity
    calculateTotal() {
        const pricePerMeal = MEAL_PRICES[this.#mealType];
        const total = pricePerMeal * this.#quantity;
        return total;
    }

        // Re-checks every field on this booking and rejects it if anything is
    // missing or invalid. The setters already validate each value as soon
    // as it is assigned, so this method mainly exists as an explicit,
    // callable check and as a safety net.
    validate() {
        const validTypes = Object.keys(MEAL_PRICES);

        if (!this.#studentId || this.#studentId.toString().trim() === "") {
            throw new Error("Student ID is required.");
        }
        if (!this.#studentName || this.#studentName.trim() === "") {
            throw new Error("Student name is required.");
        }
        if (!this.#mealDate || this.#mealDate.trim() === "") {
            throw new Error("Meal date is required.");
        }
        if (!validTypes.includes(this.#mealType)) {
            throw new Error(`Meal type must be one of: ${validTypes.join(", ")}`);
        }
        if (!Number.isInteger(this.#quantity) || this.#quantity <= 0) {
            throw new Error("Quantity must be a whole number greater than 0.");
        }

        return true;
    }

    // Moves the booking from Pending to Confirmed.
    // A booking that has already been cancelled cannot be confirmed.
    confirmBooking() {
        if (this.#bookingStatus === "Cancelled") {
            throw new Error("A cancelled booking cannot be confirmed.");
        }
        if (this.#bookingStatus === "Confirmed") {
            throw new Error("This booking is already confirmed.");
        }
        this.#bookingStatus = "Confirmed";
        return this.#bookingStatus;
    }

    // Moves the booking to Cancelled, from either Pending or Confirmed.
    cancelBooking() {
        if (this.#bookingStatus === "Cancelled") {
            throw new Error("This booking is already cancelled.");
        }
        this.#bookingStatus = "Cancelled";
        return this.#bookingStatus;
    }

    // Return the booking information as a formatted summary
    getSummary() {
        const total = this.calculateTotal();
        return (
            "----- Booking Summary -----\n" +
            `Student ID     : ${this.#studentId}\n` +
            `Student Name   : ${this.#studentName}\n` +
            `Meal Date      : ${this.#mealDate}\n` +
            `Meal Type      : ${this.#mealType}\n` +
            `Quantity       : ${this.#quantity}\n` +
            `Dietary Note   : ${this.#dietaryNote}\n` +
            `Booking Status : ${this.#bookingStatus}\n` +
            `Total Cost     : K${total.toFixed(2)}\n` +
            "---------------------------"
        );
    }
}

module.exports = MealBooking;
