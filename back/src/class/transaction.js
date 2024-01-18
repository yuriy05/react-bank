const getDate = (time) => {
    const date = new Date(time);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day}.${month} ${hours}:${minutes}`;

    return formattedDate;
}

class Transaction {
    static #list = [];
    static #count = 1;
    static #balance = 77000;
    
    constructor({type, amount, source}) {
        this.type = String(type).toLowerCase();
        this.amount = Number(amount);
        this.source = String(source).toLowerCase();

        this.transationId = Transaction.#count++;
        this.date = getDate(new Date().getTime());

        if (this.type === "send" && this.amount < Transaction.#balance) {
            Transaction.#balance -= this.amount;
        } else if (this.type === "receive") {
            Transaction.#balance += this.amount;
        }
    }

    static create (data) {
        const newTransaction = new Transaction(data);
        Transaction.#list.push(newTransaction);
        return newTransaction;
    };

    static getBalance = () => {
        return Transaction.#balance;
    };

    static getById(transationId) {
        return this.#list.find((item) => item.transationId === Number(transationId)) || null
    }

    static getList = () => {
        return Transaction.#list.map((transaction) => ({
            id: transaction.transationId,
            type: transaction.type,
            amount: transaction.amount,
            source: transaction.source,
            date: transaction.date,
        }));
    }
};

module.exports = { Transaction };