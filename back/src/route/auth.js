//* Підключаю технолгію Express.js
const express = require("express")

//*  Підключаю вбудований роутер для маршрутизації 
const router = express.Router()

//* Підключаю файли класів
const { Session } = require("../class/session")
const { User } = require("../class/user")
const { Confirm } = require("../class/confirm")

//===================================================

router.post('/signup', function (req, res) {	
	const { email, password } = req.body

	try {
		const user = User.getByData(email)
		if (user) {
			return res.status(400).json({
				message: `User with this email already exists!`,				
				field: 'email',
			})
		}

		const newUser = User.create({ email, password });
		console.log('New User: ', newUser);

    	const initSession = Session.create(newUser) ;
		console.log('Current Session ', initSession.token);

			Confirm.create(newUser.email);
			console.log('Confirm with this code: ', Confirm.getCode(newUser.email));

		return res.status(200).json({
			message: `User has been successfully created!`,
			initSession,
		  })
		} catch (err) {
			return res.status(400).json({
				message: `Error creating new user.`,
				field: 'data',
			})
		}
	  })

//=================================================

router.post('/signup-confirm', function (req, res) {	
	const { code, token, getInfo } = req.body

	if (!code) {
		return res.status(400).json({
			message: `Enter your code!`,				
			field: 'data',
		})
	}

	try {
		const initSession = Session.get(token)  ;
		if (!initSession) {
			return res.status(400).json({
				message: `Come back and Sign In!`,				
				field: 'data',
			})
		}

		const email = Confirm.getData(Number(code));
		console.log(`Code for email: `, email)

		if (!email) {
			return res.status(400).json({
				message: `This code is wrong!`,	
				field: 'data',
			})
		}

		if (email !== initSession.user.email) {
			return res.status(400).json({
				message: `This code is wrong! `,	
				field: 'data',
			})
		}

		const user = User.getByData(email)
		
    	const session = Session.create(user)  ;
		console.log('New Session > ', session.token);

		user.isConfirm = true;
		session.user.isConfirm = true;

		console.log(user)

		Notification.create({action:'sign up', name:user.email , info:getInfo});
				
		return res.status(200).json({
			message: `Welcome!`,
			session,
			})
			
	} catch (err) {
		return res.status(400).json({
			message: `Error verifying new user.`,
			field: 'data',
		})
	}
})

//===================================================

router.post("/signin", function(req, res) {
    const { email, password, getInfo} = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all fields!",
            field: "data",
        })
    }

    try {
        const user = User.getByData(email)
        console.log("What's up, ", user.email)

        if (!user) {
            return res.status(400).json({
                message: "This user has not an account.",
                field: "email",
            })
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "This password is wrong.",
                field: "password",
            })
        }

        const session = Session.create(user);
        console.log("Current Session ", session);

        Notification.create({action:'sign in', name:user.email , info:getInfo});

        return res.status(200).json({
            message: "Welcome!",
            session,
        })        
    } catch (e) {
        return res.status(400).json({
            message: "Enter valid user details",
            field: "data",
        })
    }
})

//=================================================

router.post("/recovery", function(req, res) {
    const { email } = req.body
    
    if (!email) {
        return res.status(400).json({
            message: "Enter your email!",
            field: "email",
        })
    }

    try {
        const user = User.getByData(email)
        console.log(user)

        if (!user) {
            return res.status(400).json({
                message: "User with this email doesn't exist",
                field: "email",
            })
        }

        Confirm.create(user.email);
        console.log("Recover with this code: ", Confirm.getCode(user.email))

        return res.status(200).json({
            message: "Check your email to find the code!",
        })
    } catch (e) {
        return res.status(400).json({
            message: "Enter valid user details",
            fiedl: "data"
        })
    }
})

//=================================================
module.exports = router