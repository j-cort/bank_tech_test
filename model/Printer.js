class Printer {

  printStatement(transactions) {
    console.log("date || credit || debit || balance");
    for (let i = transactions.length-1; i >= 0; i--) {
      const date = this.generateDate(transactions[i].date)
      const credit = this.generateCredit(transactions[i].value)
      const debit = this.generateDebit(transactions[i].value)
      const balance = this.generateBalance(transactions, i)
      console.log(`${date} || ${credit} || ${debit} || ${balance}`);
    }
  }

  generateDate(date) {
    return date.toLocaleString().split(",")[0];
  }

  generateCredit(value) {
    return value > 0 ? value.toFixed(2).toString() : "";
  }

  generateDebit(value) {
    return value < 0 ? Math.abs(value).toFixed(2).toString() : "";
  }

  generateBalance(transactions, i) {
    const transactionValues = transactions.filter((transaction, index) => index <= i)
      .map(transaction => transaction.value)
    return transactionValues.reduce((prev, curr) => prev + curr)
      .toFixed(2).toString()
  }

}

module.exports = Printer;

