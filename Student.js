/*
Program: Dining Meal Booking Feature - Lab 2 (Credit Extension)
Student Name: Mareerose Possi
Student ID: 240456
Date: 14 August 2026
Description: Student class - stores a student's identity so it can be
shared by (referenced from) several MealBooking objects instead of
each booking storing its own copy of the student's details.
*/

// Declaring a class named Student
class Student {
    // Private fields - protect the internal state of a student
    #studentId;
    #firstName;
    #lastName;

    // Constructor accepts the student ID, first name and last name and
    // uses "this" to run each value through its setter for validation.
    constructor(studentId, firstName, lastName) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters:

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

    // ----- firstName -----
    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        if (!value || value.trim() === "") {
            throw new Error("First name is required.");
        }
        this.#firstName = value.trim();
    }

    // ----- lastName -----
    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        if (!value || value.trim() === "") {
            throw new Error("Last name is required.");
        }
        this.#lastName = value.trim();
    }

    // Returns the first name and last name combined as one value
    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    // Returns a formatted block of the student's details
    displayInfo() {
        return (
            "========================================\n" +
            "             STUDENT DETAILS\n" +
            "========================================\n" +
            `Student ID: ${this.#studentId}\n` +
            `Student Name: ${this.getFullName()}\n` +
            "========================================"
        );
    }
}

module.exports = Student;
