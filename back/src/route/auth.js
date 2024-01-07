//* Підключаю технолгію Express.js
const express = require("express")

//*  Підключаю вбудований роутер для маршрутизації 
const router = express.Router()

//* Підключаю файли класів
const { Session } = require("../class/session")
const { User } = require("../class/user")
const { Confirm } = require("../class/confirm")

//===================================================

router.post("/signup", function(req, res) {
    const { email, password } = req.body

    try {
        const user = User.getData(email)
        if(user) {
            return res.status(400).json({
                message: "User already exist",
                field: "email",
            })
        }

        const newUser = User.create({email, password})
        console.log("New user: ", newUser)

        const initSession = Session.create(newUser)
        console.log("Session: ", initSession)

        Confirm.create(newUser.email);
        console.log("Confirm with this code: ", Confirm.getCode(newUser.email))

        return res.status(200).json({
            message: "User has been succesfuly created",
            initSession,
        })
    } catch(e) {
        return res.status(400).json({
            message: "Error, something goes wrong...",
            field: "data",
        })
    }
})

//===================================================

router.post("/confirm", function(req, res) {
    const { code, token, getInfo } = req.body

    if (!code) {
        return res.status(400).json({
            message: "Enter your code",
            field: "data",
        })
    }

    try {
        const initSession = Session.getToken(token);
        if (!initSession) {
            return res.status(400).json({
                message: "U need to Sign In",
                field: "data",
            })
        }

        const email = Confirm.getData(Number(code));
        console.log("Code for email", email)

        if (!email) {
            return res.status(400).json({
                message: "This code is wrong",
                field: "data",
            })
        }

        if(email !== initSession.user.email) {
            return res.status(400).json({
                message: "This code is wrong",
                field: "data",
            })
        }

        const user = User.getData(email)

        const session = Session.create(user)
        console.log("New Session: ", session.token);

        user.isConfirm = true;
        session.user.isConfirm = true;

        console.log(user)

        Notification.create({action: "sign up", name: user.email, info:getInfo});

        return res.status(200).json({
            message: "Welcome",
            session,
        })
    } catch (e) {
        return res.status(400).json({
            message: "Error verifyng new user !",
            field: "data"
        })
    }
})

//===================================================

module.exports = router