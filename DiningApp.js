/*
Program: Dining Meal Booking Feature -Lab 1
Student Name: Mareerose Possi
Student ID: 240456
Date: 17 July 2026
Description: A JavaScript program demonstrating classes,
objects, constructors, private fields and methods.
*/
/*
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

*/

/*
Program: Dining Meal Booking Feature - Lab 2 (Credit Extension)
Student Name: Mareerose Possi
Student ID: 240456
Date: 14 August 2026
Description: Console application connecting Student objects to
MealBooking objects. A Student object stores identity information and
can be shared by (referenced from) several MealBooking objects, which
removes the duplication that existed in Lab 1.
*/

const readline = require("readline/promises");
const { stdin: input, stdout: output } = process;
const Student = require("./Student");
const MealBooking = require("./MealBooking");

// All students and bookings are stored here for the lifetime of the
// program (no database - plain JavaScript arrays, as required)
const students = [];
const bookings = [];

const rl = readline.createInterface({ input, output });

const LINE = "=".repeat(40);

// ----- Finds an existing student by ID, or returns undefined -----
function findStudentById(studentId) {
    const id = studentId.toString().trim();
    return students.find((student) => student.studentId === id);
}

// ----- Duplicate-booking rule -----
// Prevents the same student from booking the same meal type on the same date
function isDuplicateBooking(studentId, mealDate, mealType) {
    return bookings.some(
        (booking) =>
            booking.student.studentId === studentId &&
            booking.mealDate === mealDate &&
            booking.mealType === mealType
    );
}

// ----- Displays an error message without crashing the program -----
function printError(message) {
    console.log(LINE);
    console.log("REQUEST REJECTED");
    console.log(LINE);
    console.log(`Error: ${message}`);
    console.log(LINE);
}

// ----- Option 1: Create a new Student -----
async function createStudentFlow() {
    console.log(LINE);
    console.log("NEW STUDENT");
    console.log(LINE);

    const studentId = await rl.question("Student ID: ");

    try {
        if (findStudentById(studentId)) {
            throw new Error(`A student with ID ${studentId.trim()} already exists.`);
        }

        const firstName = await rl.question("First name: ");
        const lastName = await rl.question("Last name: ");

        const student = new Student(studentId, firstName, lastName);
        students.push(student);

        console.log(student.displayInfo());
    } catch (error) {
        printError(error.message);
    }
}

// ----- Gets an existing student, or collects details and creates a new one -----
// This is what allows one Student object to be reused across several bookings.
async function getOrCreateStudent() {
    const studentId = await rl.question("Student ID: ");
    const existing = findStudentById(studentId);

    if (existing) {
        console.log(`Existing student found: ${existing.getFullName()}`);
        return existing;
    }

    console.log("No existing student found - let's create one.");
    const firstName = await rl.question("First name: ");
    const lastName = await rl.question("Last name: ");

    const student = new Student(studentId, firstName, lastName);
    students.push(student);
    return student;
}

// ----- Collects meal-booking details from the student via the console -----
async function promptBookingDetails() {
    const mealDate = await rl.question("Meal date: ");
    const mealType = await rl.question("Meal type: ");
    const quantity = await rl.question("Quantity: ");
    const dietaryNote = await rl.question("Dietary note: ");

    return { mealDate, mealType, quantity, dietaryNote };
}

// ----- Displays a booking receipt in the required format -----
function printReceipt(booking, heading = "BOOKING CREATED") {
    console.log(LINE);
    console.log(heading);
    console.log(LINE);
    console.log(`Student: ${booking.student.getFullName()} (${booking.student.studentId})`);
    console.log(`Meal: ${booking.mealType} x ${booking.quantity}`);
    console.log(`Date: ${booking.mealDate}`);
    console.log(`Dietary note: ${booking.dietaryNote}`);
    console.log(`Status: ${booking.bookingStatus}`);
    console.log(`Total cost: K${booking.calculateTotal().toFixed(2)}`);
    console.log(LINE);
}

// ----- Option 2: Create a new booking, connected to a Student object -----
async function createBookingFlow() {
    console.log(LINE);
    console.log("DWU DINING MEAL BOOKING");
    console.log(LINE);

    try {
        const student = await getOrCreateStudent();
        const details = await promptBookingDetails();

        // Reject a duplicate booking BEFORE creating any object
        if (isDuplicateBooking(student.studentId, details.mealDate.trim(), details.mealType.trim())) {
            throw new Error(
                `A ${details.mealType} booking already exists for student ${student.studentId} on ${details.mealDate}.`
            );
        }

        // The constructor runs every field through its setter, so missing
        // or invalid data (bad student object, bad meal type, quantity
        // below 1, etc.) throws an Error here rather than creating a bad object.
        const booking = new MealBooking({ student, ...details });

        // Explicit validation check
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
            `${index + 1}. ${booking.student.getFullName()} (${booking.student.studentId}) - ` +
            `${booking.mealType} on ${booking.mealDate} - ${booking.bookingStatus}`
        );
    });
    console.log(LINE);
    return true;
}

// ----- Option 3: Confirm a booking -----
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

// ----- Option 4: Cancel a booking -----
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

// ----- Option 5: View all bookings -----
function viewAllBookings() {
    if (bookings.length === 0) {
        console.log("There are no bookings yet.");
        return;
    }

    bookings.forEach((booking) => {
        console.log(booking.getSummary());
    });
}

// ----- Task 3: Student Booking History -----
// Receives a Student object and the booking array, then displays that
// student's details once, all of their bookings, the booking count and
// the combined cost of those bookings.
function displayBookingHistory(student, bookingList) {
    const studentBookings = bookingList.filter(
        (booking) => booking.student.studentId === student.studentId
    );

    console.log(LINE);
    console.log("          STUDENT INFORMATION");
    console.log(LINE);
    console.log(`Student ID: ${student.studentId}`);
    console.log(`Student Name: ${student.getFullName()}`);
    console.log(LINE);
    console.log("            BOOKING HISTORY");
    console.log(LINE);

    if (studentBookings.length === 0) {
        console.log("This student has no bookings yet.");
        console.log(LINE);
        return;
    }

    let combinedCost = 0;
    studentBookings.forEach((booking, index) => {
        const cost = booking.calculateTotal();
        combinedCost += cost;
        console.log(`${index + 1}. ${booking.mealType} - ${booking.mealDate}`);
        console.log(`   Quantity: ${booking.quantity}`);
        console.log(`   Status: ${booking.bookingStatus}`);
        console.log(`   Cost: K${cost.toFixed(2)}`);
    });

    console.log(`Total Bookings: ${studentBookings.length}`);
    console.log(`Combined Cost: K${combinedCost.toFixed(2)}`);
    console.log(LINE);
}

// ----- Option 6: Look up a student, then show their booking history -----
async function bookingHistoryFlow() {
    if (students.length === 0) {
        console.log("There are no students yet.");
        return;
    }

    const studentId = await rl.question("Enter the student ID: ");

    try {
        const student = findStudentById(studentId);
        if (!student) {
            throw new Error(`No student found with ID ${studentId.trim()}.`);
        }

        displayBookingHistory(student, bookings);
    } catch (error) {
        printError(error.message);
    }
}

// ----- Task 4: Controlled Student Updates -----
// Because bookings hold a reference to the Student object rather than a
// copy of its details, updating the name here is immediately reflected
// the next time an existing booking's summary is printed.
async function updateStudentFlow() {
    if (students.length === 0) {
        console.log("There are no students yet.");
        return;
    }

    const studentId = await rl.question("Enter the student ID to update: ");

    try {
        const student = findStudentById(studentId);
        if (!student) {
            throw new Error(`No student found with ID ${studentId.trim()}.`);
        }

        console.log(`Current name: ${student.getFullName()}`);
        const firstName = await rl.question("New first name (leave blank to keep current): ");
        const lastName = await rl.question("New last name (leave blank to keep current): ");

        if (firstName.trim() !== "") {
            student.firstName = firstName;
        }
        if (lastName.trim() !== "") {
            student.lastName = lastName;
        }

        console.log("Student name updated.");
        console.log(student.displayInfo());
    } catch (error) {
        printError(error.message);
    }
}

// ----- Main menu loop -----
async function mainMenu() {
    let exit = false;

    while (!exit) {
        console.log(
            "\n1) New Student" +
            "\n2) New Booking" +
            "\n3) Confirm Booking" +
            "\n4) Cancel Booking" +
            "\n5) View All Bookings" +
            "\n6) View Student Booking History" +
            "\n7) Update Student Name" +
            "\n8) Exit"
        );
        const choice = (await rl.question("Select an option: ")).trim();

        switch (choice) {
            case "1":
                await createStudentFlow();
                break;
            case "2":
                await createBookingFlow();
                break;
            case "3":
                await confirmBookingFlow();
                break;
            case "4":
                await cancelBookingFlow();
                break;
            case "5":
                viewAllBookings();
                break;
            case "6":
                await bookingHistoryFlow();
                break;
            case "7":
                await updateStudentFlow();
                break;
            case "8":
                exit = true;
                break;
            default:
                console.log("Invalid option. Please choose 1-8.");
        }
    }

    rl.close();
    console.log("Program ended.");
}

mainMenu();
