import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeTransactionsArray = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    incomeTransactionsArray =
      incomeTransactionsArray !== undefined ? incomeTransactionsArray : [];

    const incomeArray = incomeTransactionsArray.map(
      transaction => transaction.value,
    );
    const income = incomeArray.reduce(
      (sum, transaction) => sum + transaction,
      0,
    );

    let outcomeTransactionsArray = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    outcomeTransactionsArray =
      outcomeTransactionsArray !== undefined ? outcomeTransactionsArray : [];
    const outcomeArray = outcomeTransactionsArray.map(
      transaction => transaction.value,
    );

    const outcome = outcomeArray.reduce(
      (sum, transaction) => sum + transaction,
      0,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
