const Printer = require("./Printer")

class Account {

  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.printer = new Printer()
  }

  deposit(num) {
    const amount = this.validate(num);
    this.balance += amount;
    this.recordTransaction("deposit", new Date(), amount);
  }

  withdraw(num) {
    const amount = this.validate(num);
    if (this.checkIfEnoughBalance(amount)) this.balance -= amount;
    this.recordTransaction("withdrawal", new Date(), amount);
  }

  validate(num) {
    const regex = /^\d*\.?\d{1,2}$/;
    if (regex.test(num) && Number(num)) {
      return Number(num);
    } else {
      throw "Error: invalid input";
    }
  }

  checkIfEnoughBalance(amount) {
    if (amount <= this.balance) {
      return true;
    } else {
      throw "Error: insufficient balance";
    }
  }

  recordTransaction(type, date, value) {
    if (type === "withdrawal") value *= -1;
    this.transactions.unshift({ date, value, balance: this.balance });
  }

  printStatement() {
    this.printer.printStatement(this.transactions)
  }

}

module.exports = Account;
