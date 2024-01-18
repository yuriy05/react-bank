//* Підключаю технолгію Express.js
const express = require("express")

//*  Підключаю вбудований роутер для маршрутизації 
const router = express.Router()

//* Підключаю файли класів
const { User } = require("../class/user")
const { Notification } = require("../class/notification");
const { Transaction } = require("../class/transaction")

Transaction.create({
	type: "send",
	amount: 1000,
	source: "owner@mail.com"
})

Transaction.create({
	type: "send",
	amount: 1,
	source: "friend@gmail.com"
})

Notification.create({
	action:'notification', 
	name:'Bank Corp.' , 
	info: 'Congradulations! Your Welcome bonus is $50'
});

Notification.create({
	action:'sign up', 
	name:'anonimous@anonim.com' , 
	info: `(Linux)`
});

//===================================================

router.get("/balance", function(req, res) {
	res.json({
		balance: Transaction.getBalance(),
		list: Transaction.getList().reverse(),
		notifications: Notification.getUnread().length,
	});
});

//===================================================
module.exports = router