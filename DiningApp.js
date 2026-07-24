/*
Program: Dining Meal Booking Feature
Student Name: Mareerose Possi
Student ID: 240456
Date: 17 July 2026
Description: A JavaScript program demonstrating classes,
objects, constructors, private fields and methods.
*/

const readline = require("readline/promises");
const { stdin: input, stdout: output } = process;
const MealBooking = require("./MealBooking");

// All bookings are stored here for the lifetime of the program (no database)
const bookings = [];

const rl = readline.createInterface({ input, output });

const LINE = "=".repeat(40);

// ----- Duplicate-booking rule -----
// Prevents the same student from booking the same meal type on the same date
function isDuplicateBooking(studentId, mealDate, mealType) {
    return bookings.some(
        (booking) =>
            booking.studentId === studentId &&
            booking.mealDate === mealDate &&
            booking.mealType === mealType
    );
}

// ----- Collects booking details from the student via the console -----
async function promptBookingDetails() {
    const studentId = await rl.question("Student ID: ");
    const studentName = await rl.question("Student name: ");
    const mealDate = await rl.question("Meal date: ");
    const mealType = await rl.question("Meal type: ");
    const quantity = await rl.question("Quantity: ");
    const dietaryNote = await rl.question("Dietary note: ");

    return { studentId, studentName, mealDate, mealType, quantity, dietaryNote };
}

// ----- Displays a booking receipt in the required format -----
function printReceipt(booking, heading = "BOOKING CREATED") {
    console.log(LINE);
    console.log(heading);
    console.log(LINE);
    console.log(`Student: ${booking.studentName} (${booking.studentId})`);
    console.log(`Meal: ${booking.mealType} x ${booking.quantity}`);
    console.log(`Date: ${booking.mealDate}`);
    console.log(`Dietary note: ${booking.dietaryNote}`);
    console.log(`Status: ${booking.bookingStatus}`);
    console.log(`Total cost: K${booking.calculateTotal().toFixed(2)}`);
    console.log(LINE);
}

// ----- Displays an error message without crashing the program -----
function printError(message) {
    console.log(LINE);
    console.log("BOOKING REJECTED");
    console.log(LINE);
    console.log(`Error: ${message}`);
    console.log(LINE);
}

// ----- Option 1: Create a new booking -----
async function createBookingFlow() {
    console.log(LINE);
    console.log("DWU DINING MEAL BOOKING");
    console.log(LINE);

    const details = await promptBookingDetails();

    try {
        // Reject a duplicate booking BEFORE creating any object
        if (isDuplicateBooking(details.studentId.trim(), details.mealDate.trim(), details.mealType.trim())) {
            throw new Error(
                `A ${details.mealType} booking already exists for student ${details.studentId} on ${details.mealDate}.`
            );
        }

        // The constructor runs every field through its setter, so missing
        // or invalid data (blank ID, bad meal type, quantity below 1, etc.)
        // throws an Error here rather than creating a bad object.
        const booking = new MealBooking(details);

        // Explicit validation check, as required by Part 2
        booking.validate();

        bookings.push(booking);
        printReceipt(booking, "BOOKING CREATED");
    } catch (error) {
        printError(error.message);
    }
}

// ----- Lists current bookings with an index, for selection -----
function listBookingsForSelection() {
    if (bookings.length === 0) {
        console.log("There are no bookings yet.");
        return false;
    }

    console.log(LINE);
    console.log("CURRENT BOOKINGS");
    console.log(LINE);
    bookings.forEach((booking, index) => {
        console.log(
            `${index + 1}. ${booking.studentName} (${booking.studentId}) - ` +
            `${booking.mealType} on ${booking.mealDate} - ${booking.bookingStatus}`
        );
    });
    console.log(LINE);
    return true;
}

// ----- Option 2: Confirm a booking -----
async function confirmBookingFlow() {
    if (!listBookingsForSelection()) return;

    const answer = await rl.question("Enter the booking number to confirm: ");
    const index = Number(answer) - 1;

    try {
        if (!bookings[index]) {
            throw new Error("No booking exists with that number.");
        }

        bookings[index].confirmBooking();
        printReceipt(bookings[index], "BOOKING CONFIRMED");
    } catch (error) {
        printError(error.message);
    }
}

// ----- Option 3: Cancel a booking -----
async function cancelBookingFlow() {
    if (!listBookingsForSelection()) return;

    const answer = await rl.question("Enter the booking number to cancel: ");
    const index = Number(answer) - 1;

    try {
        if (!bookings[index]) {
            throw new Error("No booking exists with that number.");
        }

        bookings[index].cancelBooking();
        printReceipt(bookings[index], "BOOKING CANCELLED");
    } catch (error) {
        printError(error.message);
    }
}

// ----- Option 4: View all bookings -----
function viewAllBookings() {
    if (bookings.length === 0) {
        console.log("There are no bookings yet.");
        return;
    }

    bookings.forEach((booking) => {
        console.log(booking.getSummary());
    });
}

// ----- Main menu loop -----
async function mainMenu() {
    let exit = false;

    while (!exit) {
        console.log("\n1) New Booking\n2) Confirm Booking\n3) Cancel Booking\n4) View All Bookings\n5) Exit");
        const choice = (await rl.question("Select an option: ")).trim();

        switch (choice) {
            case "1":
                await createBookingFlow();
                break;
            case "2":
                await confirmBookingFlow();
                break;
            case "3":
                await cancelBookingFlow();
                break;
            case "4":
                viewAllBookings();
                break;
            case "5":
                exit = true;
                break;
            default:
                console.log("Invalid option. Please choose 1-5.");
        }
    }

    rl.close();
    console.log("Program ended.");
}

mainMenu();