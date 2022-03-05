class Printer {

  printStatement(transactions) {
    console.log("date || credit || debit || balance");
    for (let transaction of transactions) {
      const date = transaction.date.toLocaleString().split(",")[0];
      const credit = transaction.value > 0 ? transaction.value.toFixed(2).toString() : "";
      const debit =
        transaction.value < 0 ? Math.abs(transaction.value).toFixed(2).toString() : "";
      const balance = transaction.balance.toFixed(2)
      console.log(`${date} || ${credit} || ${debit} || ${balance}`);
    }
  }

}

module.exports = Printer;

