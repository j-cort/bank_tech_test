const Account = require('../model/Account')
const { expect } = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const chai = require('chai')

chai.use(sinonChai)

let account = new Account()

afterEach(() => {
  account.balance = 0;
  account.transactions = [];
})

describe('Account Class', () => {
  it('instantiates a new account with no balance or transcation history', () => {
    expect(account).to.be.an.instanceof(Account)
    expect(account.balance).to.eql(0)
    expect(account.transactions).to.eql([])
  })
})

describe('#deposit', () => {
  it('adds the deposited amount to the account balance', () => {
    account.deposit(5.50)
    expect(account.balance).to.eql(5.5)
  })

  it('throws error on non-number/number-parseable string inputs', () => {
    expect(() => { account.deposit() }).to.throw('Error: invalid input')
    expect(() => { account.deposit(0) }).to.throw('Error: invalid input')
    expect(() => { account.deposit('string') }).to.throw('Error: invalid input')
    expect(() => { account.deposit(true) }).to.throw('Error: invalid input')
    expect(() => { account.deposit(undefined) }).to.throw('Error: invalid input')
    expect(() => { account.deposit(null) }).to.throw('Error: invalid input')
    expect(() => { account.deposit(NaN) }).to.throw('Error: invalid input')
    expect(() => { account.deposit([]) }).to.throw('Error: invalid input')
    expect(() => { account.deposit({}) }).to.throw('Error: invalid input')
    expect(() => { account.deposit(72) }).not.to.throw('Error: invalid input')
    expect(() => { account.deposit('72') }).not.to.throw('Error: invalid input')
  })

  it('throws error on negative number/number-parseable string inputs', () => {
    expect(() => { account.deposit('-72') }).to.throw('Error: invalid input')
    expect(() => { account.deposit(-72) }).to.throw('Error: invalid input')
  })

  it('throws error on number/number-parseable string inputs over 2 decimal places', () => {
    expect(() => { account.deposit('72.723') }).to.throw('Error: invalid input')
    expect(() => { account.deposit(72.723) }).to.throw('Error: invalid input')
    expect(() => { account.deposit('72.7') }).not.to.throw('Error: invalid input')
    expect(() => { account.deposit(72.72) }).not.to.throw('Error: invalid input')
  })

  it('records the deposit in the account transactions', () => {
    account.deposit(5.50)
    expect(account.transactions.length).to.eql(1)
    expect(account.transactions[0].value).to.eql(5.5)
    expect(account.transactions[0].balance).to.eql(5.5)
  })
})

describe('#withdraw', () => {
  beforeEach(() => {
    account.deposit(100)
  })

  it('removes the withdrawn amount from the account balance', () => {
    account.withdraw(5.5)
    expect(account.balance).to.eql(94.5)
  })

  it('throws error on non-number/number-parseable string inputs', () => {
    expect(() => { account.withdraw() }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(0) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw('string') }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(true) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(undefined) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(null) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(NaN) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw([]) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw({}) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(72) }).not.to.throw('Error: invalid input')
    expect(() => { account.withdraw('72') }).not.to.throw('Error: invalid input')
  })

  it('throws error on negative number/number-parseable string inputs', () => {
    expect(() => { account.withdraw('-72') }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(-72) }).to.throw('Error: invalid input')
  })

  it('throws error on number/number-parseable string inputs over 2 decimal places', () => {
    expect(() => { account.withdraw('72.723') }).to.throw('Error: invalid input')
    expect(() => { account.withdraw(72.723) }).to.throw('Error: invalid input')
    expect(() => { account.withdraw('72.7') }).not.to.throw('Error: invalid input')
    expect(() => { account.withdraw(72.72) }).not.to.throw('Error: invalid input')
  })

  it('throws error on withdrawal amount greater than balance', () => {
    expect(() => { account.withdraw(100.72) }).to.throw('Error: insufficient balance')
  })

  it('records the withdrawal in the account transactions', () => {
    account.withdraw(5.5)
    expect(account.transactions.length).to.eql(2)
    expect(account.transactions[0].value).to.eql(-5.5)
    expect(account.transactions[0].balance).to.eql(94.5)
  })
})

describe('#printStatement', () => {

  beforeEach(function() {
    sinon.spy(console, 'log');
    account.deposit(1000)
    account.deposit(2000)
    account.withdraw(500)
  });

  afterEach(function() {
    console.log.restore();
  });
  
  it('prints statement to console', () => {
    account.printStatement()
    expect(console.log).to.have.been.calledWith("date || credit || debit || balance");
    expect(console.log).to.have.been.calledWith("02/02/2022 ||  || 500 || 2500");
    expect(console.log).to.have.been.calledWith("02/02/2022 || 2000 ||  || 3000");
    expect(console.log).to.have.been.calledWith("02/02/2022 || 1000 ||  || 1000");
  })
 
})




