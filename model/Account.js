// const Printer = require("./Printer")

class Account {

  constructor() {
    this.transactions = [];
    this.printer = new Printer()
    this.DEPOSIT = "DEPOSIT"
    this.WITHDRAWAL = "WITHDRAWAL"
  }

  deposit(num) {
    const amount = this.validate(num);
    this.recordTransaction(this.DEPOSIT, new Date(), amount);
  }

  withdraw(num) {
    const amount = this.validate(num);
    this.checkIfEnoughBalance(amount);
    this.recordTransaction(this.WITHDRAWAL, new Date(), amount);
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
    const balance = this.calculateBalance()
    if (amount <= balance) {
      return true;
    } else {
      throw "Error: insufficient balance";
    }
  }

  recordTransaction(type, date, value) {
    if (type === this.WITHDRAWAL) value *= -1;
    this.transactions.push({ date, value });
  }

  calculateBalance() {
    let balance = 0
    this.transactions.forEach(transaction => balance += transaction.value)
    return balance

  }

  printStatement() {
    this.printer.printStatement(this.transactions)
  }

}

module.exports = Account;
