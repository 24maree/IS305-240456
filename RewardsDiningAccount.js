
const DiningAccount = require("./DiningAccount");

class RewardsDiningAccount extends DiningAccount {
  #rewardRate;

  constructor(accountNumber, openingBalance = 0, rewardRate = 1) {
    super(accountNumber, openingBalance); // constructor chaining
    if (typeof rewardRate !== "number" || rewardRate < 0) {
      throw new Error("Reward rate cannot be negative.");
    }
    this.#rewardRate = rewardRate;
  }

  get rewardRate() {
    return this.#rewardRate;
  }

  calculateReward() {
    return (this.getBalance() * this.#rewardRate) / 100;
  }

  applyReward() {
    const reward = this.calculateReward();
    if (reward > 0) {
      this._setBalance(this.getBalance() + reward);
      this._recordTransaction(
        "Reward",
        reward,
        `Loyalty reward applied at ${this.#rewardRate}%`
      );
    }
    return reward;
  }

  getAccountType() {
    return "Rewards Dining Account";
  }

  // Method overriding: extends the base display with reward-specific info.
  displayAccountSummary() {
    super.displayAccountSummary();
    console.log(`Reward Rate: ${this.#rewardRate}%`);
  }
}

module.exports = RewardsDiningAccount;
