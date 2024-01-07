class User {
    static #list = [];
    static #count = 1;
    static #savings = 50;

    constructor({email, password}) {
        this.email = String(email).toLocaleLowerCase();
        this.password = String(password);

        this.isConfirm = false;
        this.userId = User.#count++;
        this.property = User.#savings
    };

    static create(data) {
        const user = new User(data);

        this.#list.push(user);

        return user;
    }

    static getData(data) {
        if (typeof data === "number") {
            return (
                this.#list.find((user) => {
                    user.userId === data || null
                })
            )
        } else {
            return (
                this.#list.find((user) => {
                    user.email === data.toLocaleLowerCase() || null
                })
            )
        }
    }

    static updateData(user, typeNewData, newData) {
        if (typeNewData === "email") {
            user.email === String(newData).toLocaleLowerCase()
            return true
        } else if (typeNewData === "password") {
            user.password === String(newData);
        } 
        return false
    }

    static useConfirm (email) {
        const user = User.getData(email);

        if (user) {
            user.isConfirm = true
        } return false
    }
}

module.exports = { User };