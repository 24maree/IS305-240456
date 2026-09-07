
class DiningAccount {
  #accountNumber;
  #balance;
  #transactions;

  constructor(accountNumber, openingBalance = 0) {
    if (!accountNumber || accountNumber.toString().trim() === "") {
      throw new Error("Account number cannot be empty.");
    }
    if (typeof openingBalance !== "number" || Number.isNaN(openingBalance)) {
      throw new Error("Opening balance must be a number.");
    }
    if (openingBalance < 0) {
      throw new Error("Opening balance cannot be negative.");
    }

    this.#accountNumber = accountNumber.toString().trim();
    this.#balance = openingBalance;
    this.#transactions = [];

    if (openingBalance > 0) {
      this._recordTransaction("Deposit", openingBalance, "Opening balance");
    }
  }

  // ---------- Public accessors ----------
  get accountNumber() {
    return this.#accountNumber;
  }

  getBalance() {
    return this.#balance;
  }

  getTransactions() {
    // Return a safe copy so callers cannot mutate internal history.
    return this.#transactions.map((t) => ({ ...t }));
  }

  getAccountType() {
    return "Standard Dining Account";
  }

  // ---------- Protected-style helpers for subclasses ----------
  // True private fields (#balance, #transactions) are only reachable from
  // code written inside THIS class body, but methods defined here are
  // still inherited and callable by subclass instances. These two
  // helpers give subclasses a controlled way to update account state
  // without exposing the private fields directly (JS has no "protected").
  _recordTransaction(type, amount, description) {
    this.#transactions.push({
      type,
      amount,
      description,
      dateTime: new Date(),
      balanceAfter: this.#balance,
    });
  }

  _setBalance(newBalance) {
    this.#balance = newBalance;
  }

  // ---------- Core behaviour ----------

  // Simulated method overloading via a default parameter:
  //   account.deposit(500)
  //   account.deposit(500, "Weekly meal allowance")
  deposit(amount, description = "Deposit") {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Deposit amount must be greater than zero.");
    }
    this.#balance += amount;
    this._recordTransaction("Deposit", amount, description);
    return true;
  }

  payForMeal(amount, description = "Meal payment") {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Payment amount must be greater than zero.");
    }
    if (amount > this.#balance) {
      console.log(
        `Payment rejected: insufficient funds. Balance: K${this.#balance.toFixed(
          2
        )}, Required: K${amount.toFixed(2)}`
      );
      return false;
    }
    this.#balance -= amount;
    this._recordTransaction("Meal Payment", amount, description);
    return true;
  }

  displayAccountSummary() {
    console.log("========================================");
    console.log(this.getAccountType().toUpperCase());
    console.log("========================================");
    console.log(`Account Number: ${this.#accountNumber}`);
    console.log(`Current Balance: K${this.#balance.toFixed(2)}`);
  }
}

module.exports = DiningAccount;
