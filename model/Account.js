class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(num) {
    const amount = this.validate(num)
    this.balance += amount
  }

  validate(num) {
    const regex = /^\d*\.?\d{1,2}$/
    if(regex.test(num)) {
      return Number(num)
    } else {
      throw 'Error: invalid input'
    }
  }
}

module.exports = Account;
