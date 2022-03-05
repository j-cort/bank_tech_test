const Printer = require('../model/Printer')
const { expect } = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const chai = require('chai')

chai.use(sinonChai)

describe('#printStatement', () => {

  beforeEach(function() {
    sinon.spy(console, 'log');
  });

  afterEach(function() {
    console.log.restore();
  });
  
  it('prints statement to console (w/synthetic data)', () => { 
    const printer = new Printer()  
    let transactions = []
    transactions.push({date: new Date('01/10/2023'), value: 1000, balance: 1000})
    transactions.push({date: new Date('01/13/2023'), value: 2000, balance: 3000})
    transactions.push({date: new Date('01/14/2023'), value: -500, balance: 2500})

    printer.printStatement(transactions)

    expect(console.log).to.have.been.calledWith("date || credit || debit || balance");
    expect(console.log).to.have.been.calledWith("14/01/2023 ||  || 500.00 || 2500.00");
    expect(console.log).to.have.been.calledWith("13/01/2023 || 2000.00 ||  || 3000.00");
    expect(console.log).to.have.been.calledWith("10/01/2023 || 1000.00 ||  || 1000.00");
  })
 
})
