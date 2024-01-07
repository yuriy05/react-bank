class Session {
    static #list = [];

    constructor (user) {
        this.token = Session.generateConfirmCode();

        this.user = {
            email: user.email,
            isConfirm: user.isConfirm,
            userId: user.Id,
        }
    }

    static generateConfirmCode = () => {
        const length = 6
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const result = ""

        for (let i; i < length; i++) {
            const randomValue = Math.floor(Math.random() * characters.length)
            result += characters[randomValue]
        }
        return result;
    }

    static create = (user) => {
        const session = new Session(user);

        this.#list.push(session);

        return session;
    }

    static getToken = (token) => {
        return (
            this.#list.find((item) => item.token === token) || null
        );
    }
}

module.exports = { Session };