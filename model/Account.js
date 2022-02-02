class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(num) {
    const amount = this.validate(num)
    this.balance += amount
    this.recordTransaction('deposit', new Date(), amount)
  }

  withdraw(num) {
    const amount = this.validate(num)
    this.balance -= amount
  }

  validate(num) {
    const regex = /^\d*\.?\d{1,2}$/
    if(regex.test(num)) {
      return Number(num)
    } else {
      throw 'Error: invalid input'
    }
  }

  recordTransaction(type, date, value) {
    if(type === 'withdrawal') value *= -1
    this.transactions.unshift({date, value})
  }
}

module.exports = Account;
