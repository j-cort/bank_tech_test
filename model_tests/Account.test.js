const Account = require('../model/Account')

let account = new Account()

afterEach(() => {
  account.balance = 0;
  account.transactions = [];
})

describe('Account Class', () => {
  it('instantiates a new account with no balance or transcation history', () => {
    expect(account).toBeInstanceOf(Account)
    expect(account.balance).toEqual(0)
    expect(account.transactions).toEqual([])
  })
})

describe('#deposit', () => {
  it('adds the deposited amount to the account balance', () => {
    account.deposit(5.50)
    expect(account.balance).toEqual(5.5)
  })

  it('throws error on non-number/number-parseable string inputs', () => {
    expect(() => { account.deposit('string') }).toThrow('Error: invalid input')
    expect(() => { account.deposit(true) }).toThrow('Error: invalid input')
    expect(() => { account.deposit(undefined) }).toThrow('Error: invalid input')
    expect(() => { account.deposit(null) }).toThrow('Error: invalid input')
    expect(() => { account.deposit(NaN) }).toThrow('Error: invalid input')
    expect(() => { account.deposit([]) }).toThrow('Error: invalid input')
    expect(() => { account.deposit({}) }).toThrow('Error: invalid input')
    expect(() => { account.deposit(72) }).not.toThrow('Error: invalid input')
    expect(() => { account.deposit('72') }).not.toThrow('Error: invalid input')
  })

  it('throws error on negative number/number-parseable string inputs', () => {
    expect(() => { account.deposit('-72') }).toThrow('Error: invalid input')
    expect(() => { account.deposit(-72) }).toThrow('Error: invalid input')
  })

  it('throws error on number/number-parseable string inputs over 2 decimal places', () => {
    expect(() => { account.deposit('72.723') }).toThrow('Error: invalid input')
    expect(() => { account.deposit(72.723) }).toThrow('Error: invalid input')
    expect(() => { account.deposit('72.7') }).not.toThrow('Error: invalid input')
    expect(() => { account.deposit(72.72) }).not.toThrow('Error: invalid input')
  })

  it('records the deposit in the account transactions', () => {
    account.deposit(5.50)
    expect(account.transactions.length).toEqual(1)
    expect(account.transactions[0].value).toEqual(5.5)
  })
})

describe('#withdraw', () => {
  beforeEach(() => {
    account.deposit(100)
  })

  it('removes the withdrawn amount from the account balance', () => {
    account.withdraw(5.5)
    expect(account.balance).toEqual(94.5)
  })

  it('throws error on non-number/number-parseable string inputs', () => {
    expect(() => { account.withdraw('string') }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(true) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(undefined) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(null) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(NaN) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw([]) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw({}) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(72) }).not.toThrow('Error: invalid input')
    expect(() => { account.withdraw('72') }).not.toThrow('Error: invalid input')
  })

  it('throws error on negative number/number-parseable string inputs', () => {
    expect(() => { account.withdraw('-72') }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(-72) }).toThrow('Error: invalid input')
  })

  it('throws error on number/number-parseable string inputs over 2 decimal places', () => {
    expect(() => { account.withdraw('72.723') }).toThrow('Error: invalid input')
    expect(() => { account.withdraw(72.723) }).toThrow('Error: invalid input')
    expect(() => { account.withdraw('72.7') }).not.toThrow('Error: invalid input')
    expect(() => { account.withdraw(72.72) }).not.toThrow('Error: invalid input')
  })

  it('throws error on withdrawal amount greater than balance', () => {
    expect(() => { account.withdraw(100.72) }).toThrow('Error: insufficient balance')
  })

  it('records the withdrawal in the account transactions', () => {
    account.withdraw(5.5)
    expect(account.transactions.length).toEqual(2)
    expect(account.transactions[0].value).toEqual(-5.5)
  })
})




