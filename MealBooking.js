/*
Program: Dining Meal Booking Feature -Lab 1
Student Name: Mareerose Possi
Student ID: 240456
Date: 17 July 2026
Description: A JavaScript program demonstrating classes,
objects, constructors, private fields and methods.
*/
/*
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
*/

/*
Program: Dining Meal Booking Feature - Lab 2 (Credit Extension)
Student Name: Mareerose Possi
Student ID: 240456
Date: 14 August 2026
Description: A JavaScript program demonstrating classes, objects,
constructors, private fields, methods, and one object (MealBooking)
holding a reference to another object (Student).
*/
/*
const Student = require("./Student");

// Meal prices in Kina (K), keyed by meal type
const MEAL_PRICES = {
    Breakfast: 10.00,
    Lunch: 15.00,
    Dinner: 20.00
};

// Declaring a class named MealBooking
class MealBooking {
    // Private fields - protect the internal state of a booking.
    // Lab 1 stored #studentId and #studentName here directly.
    // Lab 2 replaces both with a single reference to a Student object,
    // so the booking no longer keeps its own copy of the student's details.
    #studentId;
    #studentName;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #bookingStatus;

    // Constructor now receives a Student object instead of a student
    // ID and student name.
    constructor({ student, mealDate, mealType, quantity, dietaryNote }) {
        this.student = student;
        this.mealDate = mealDate;
        this.mealType = mealType;
        this.quantity = quantity;
        this.dietaryNote = dietaryNote;

        // Every new booking starts as Pending
        this.#bookingStatus = "Pending";
    }

    //Getters and Setters:

    // ----- student -----
    get student() {
        return this.#student;
    }

    set student(value) {
        // Verify that a valid Student object was provided
        if (!(value instanceof Student)) {
            throw new Error("A valid Student object is required.");
        }
        this.#student = value;
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

        if (!(this.#student instanceof Student)) {
            throw new Error("A valid Student object is required.");
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

    // Return the booking information as a formatted summary.
    // Student ID and name are read from the connected Student object,
    // so if the Student's name is later updated, the change is reflected
    // here automatically because this is the same shared object, not a copy.
    getSummary() {
        const total = this.calculateTotal();
        return (
            "----- Booking Summary -----\n" +
            `Student ID     : ${this.#student.studentId}\n` +
            `Student Name   : ${this.#student.getFullName()}\n` +
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

/*
 * MealBooking.js
 * Represents a single meal booking made by a Student.
 * Lab 1: booking validation, cost calculation, booking status.
 * Lab 2: stores a Student object instead of raw id/name fields.
 * Lab 3: pays through a DiningAccount (or any subclass) polymorphically -
 *        this class contains no account-type-specific payment logic.
 */

const Student = require("./Student");

const MEAL_PRICES = Object.freeze({
  Breakfast: 10,
  Lunch: 15,
  Dinner: 20,
});

class MealBooking {
  #student;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;
  #paid;

  constructor(student, mealDate, mealType, quantity, dietaryNote = "None") {
    if (!(student instanceof Student)) {
      throw new Error("A valid Student object is required to create a booking.");
    }
    if (!mealDate || mealDate.toString().trim() === "") {
      throw new Error("Meal date cannot be empty.");
    }
    if (!Object.prototype.hasOwnProperty.call(MEAL_PRICES, mealType)) {
      throw new Error("Meal type must be Breakfast, Lunch or Dinner.");
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantity must be at least 1.");
    }

    this.#student = student;
    this.#mealDate = mealDate.toString().trim();
    this.#mealType = mealType;
    this.#quantity = quantity;
    this.#dietaryNote = dietaryNote && dietaryNote.trim() !== "" ? dietaryNote.trim() : "None";
    this.#bookingStatus = "Pending";
    this.#paid = false;
  }

  // ---------- Accessors ----------
  get student() {
    return this.#student;
  }

  get mealDate() {
    return this.#mealDate;
  }

  get mealType() {
    return this.#mealType;
  }

  get quantity() {
    return this.#quantity;
  }

  get dietaryNote() {
    return this.#dietaryNote;
  }

  get bookingStatus() {
    return this.#bookingStatus;
  }

  isPaid() {
    return this.#paid;
  }

  // ---------- Core behaviour ----------
  calculateTotal() {
    return MEAL_PRICES[this.#mealType] * this.#quantity;
  }

  confirmBooking() {
    this.#bookingStatus = "Confirmed";
  }

  cancelBooking() {
    this.#bookingStatus = "Cancelled";
  }

  // Lab 3: polymorphic payment - works with a DiningAccount,
  // RewardsDiningAccount or CreditDiningAccount without any
  // account-specific branching here.
  processPayment(diningAccount) {
    if (!diningAccount || typeof diningAccount.payForMeal !== "function") {
      throw new Error("A valid dining account is required to process payment.");
    }
    if (this.#paid || this.#bookingStatus === "Confirmed") {
      console.log("Payment rejected: this booking has already been paid.");
      return false;
    }
    if (this.#bookingStatus === "Cancelled") {
      console.log("Payment rejected: this booking has been cancelled.");
      return false;
    }

    const total = this.calculateTotal();
    const success = diningAccount.payForMeal(
      total,
      `${this.#mealType} booking - ${this.#mealDate}`
    );

    if (success) {
      this.#paid = true;
      this.confirmBooking();
      console.log("Payment successful. Booking confirmed.");
    } else {
      console.log("Payment failed. Booking remains Pending.");
    }
    return success;
  }

  getSummary() {
    console.log(`Student: ${this.#student.getFullName()} (${this.#student.studentId})`);
    console.log(`Meal: ${this.#mealType} x ${this.#quantity}`);
    console.log(`Date: ${this.#mealDate}`);
    console.log(`Dietary note: ${this.#dietaryNote}`);
    console.log(`Status: ${this.#bookingStatus}`);
    console.log(`Total cost: K${this.calculateTotal().toFixed(2)}`);
  }

  static isDuplicate(bookings, studentId, mealDate, mealType) {
    return bookings.some(
      (b) =>
        b.student.studentId === studentId &&
        b.mealDate === mealDate &&
        b.mealType === mealType &&
        b.bookingStatus !== "Cancelled"
    );
  }
}

module.exports = { MealBooking, MEAL_PRICES };
