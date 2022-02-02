# Bank tech test

Today, you'll practice doing a tech test.

For most tech tests, you'll essentially have unlimited time.  This practice session is about producing the best code you can when there is a minimal time pressure.

You'll get to practice your OO design and TDD skills.

You'll work alone, and you'll also review your own code so you can practice reflecting on and improving your own work.

## Specification

### Requirements

* You should be able to interact with your code via a REPL like IRB or Node.  (You don't need to implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2023  
**And** a deposit of 2000 on 13-01-2023  
**And** a withdrawal of 500 on 14-01-2023  
**When** she prints her bank statement  
**Then** she would see

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

## Self-assessment

Once you have completed the challenge and feel happy with your solution, here's a form to help you reflect on the quality of your code: https://docs.google.com/forms/d/1Q-NnqVObbGLDHxlvbUfeAC7yBCf3eCjTmz6GOqC9Aeo/edit

<!-- BEGIN GENERATED SECTION DO NOT EDIT -->

## Undertaking

Built a node.js bank account app which runs in the terminal and implements the following features:

* making a deposit
* making a withdrawal
* printing a bank statement

## Approach

* Kept methods light by logic into helper functions
* Used validation to mitigate invalid user inputs
* Allowed string inputs to allow for future input via a front-end UI

## Technologies

Node - backend 
Mocha, Chai, Nyc, Sinon  - unit testing (including testing output to console)

## Structure

Code is strucutred within a single account class, given the relative simplicity of the app. If the app were to be expanded in the future, then separate user and transaction classes could be potentially added.

## How to run the app

* Clone this repo
* Run npm install to download dependencies
* Run Account.js from the terminal with the following:

```
{
  $ node     
  $ .load model/Account.js 
  $ const account = new Account()
}
```

* Try interacting with the bank account:

```
{
  $ account.deposit(5500)
  $ account.withdraw(400)
  $ account.withdraw(1500.50)
  $ account.printStatment()
}
```
