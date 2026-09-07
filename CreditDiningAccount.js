/*
 * CreditDiningAccount.js
 * Inherits from DiningAccount. Allows the balance to fall below zero,
 * but never below the negative of the approved credit limit.
 *
 * Example: balance K1,000, credit limit K500 -> lowest allowed
 * balance is -K500, so a payment of up to K1,500 is accepted.
 */

const DiningAccount = require("./DiningAccount");

class CreditDiningAccount extends DiningAccount {
  #creditLimit;

  constructor(accountNumber, openingBalance = 0, creditLimit = 0) {
    super(accountNumber, openingBalance); // constructor chaining
    if (typeof creditLimit !== "number" || creditLimit < 0) {
      throw new Error("Credit limit cannot be negative.");
    }
    this.#creditLimit = creditLimit;
  }

  get creditLimit() {
    return this.#creditLimit;
  }

  // Method overriding: replaces the base "sufficient funds only" rule
  // with a rule that also allows spending into the approved credit limit.
  // MealBooking never needs to know this override exists - it just calls
  // payForMeal() polymorphically on whatever account it was given.
  payForMeal(amount, description = "Meal payment") {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Payment amount must be greater than zero.");
    }

    const resultingBalance = this.getBalance() - amount;
    const lowestAllowedBalance = -this.#creditLimit;

    if (resultingBalance < lowestAllowedBalance) {
      console.log(
        `Payment rejected: exceeds approved credit limit of K${this.#creditLimit.toFixed(
          2
        )}.`
      );
      return false;
    }

    this._setBalance(resultingBalance);
    this._recordTransaction("Meal Payment", amount, description);
    return true;
  }

  getAccountType() {
    return "Credit Dining Account";
  }

  displayAccountSummary() {
    super.displayAccountSummary();
    console.log(`Credit Limit: K${this.#creditLimit.toFixed(2)}`);
  }
}

module.exports = CreditDiningAccount;
