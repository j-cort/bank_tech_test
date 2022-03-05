class Printer {

  printStatement(transactions) {
    console.log("date || credit || debit || balance");
    for (let transaction of transactions) {
      const date = this.generateDate(transaction.date)
      const credit = this.generateCredit(transaction.value)
      const debit = this.generateDebit(transaction.value)
      const balance = transaction.balance.toFixed(2)
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

}

module.exports = Printer;

