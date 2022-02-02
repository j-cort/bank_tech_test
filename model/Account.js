class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(num) {
    const amount = this.validate(num);
    this.balance += amount;
    this.recordTransaction("deposit", new Date(), amount);
  }

  withdraw(num) {
    const amount = this.validate(num);
    if (this.checkEnoughBalance(amount)) this.balance -= amount;
    this.recordTransaction("withdrawal", new Date(), amount);
  }

  printStatement() {
    console.log("date || credit || debit || balance");
    for (let transaction of this.transactions) {
      const date = transaction.date.toLocaleString().split(",")[0];
      const credit = transaction.value > 0 ? transaction.value.toString() : "";
      const debit =
        transaction.value < 0 ? Math.abs(transaction.value).toString() : "";
      const { balance } = transaction;
      console.log(`${date} || ${credit} || ${debit} || ${balance}`);
    }
  }

  validate(num) {
    const regex = /^\d*\.?\d{1,2}$/;
    if (regex.test(num) && Number(num)) {
      return Number(num);
    } else {
      throw "Error: invalid input";
    }
  }

  checkEnoughBalance(amount) {
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

}

module.exports = Account;
