const { connection, connect } = require('../config/db')
const users = require('../model/users.json')
connect()


/* const register = (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const userName = req.body.userName
    const email = req.body.email
    const pw = req.body.pw
    connection.query('SELECT email from users WHERE email = ?', [email], (err, results) => {
        if (err) {
            throw err
        } else {
            if (results.length > 0) {
                res.json({ message: 'The email is already in use'})
            } else if (pw.length < 8) {
                res.json({message :'Password dont match'})
            }
        }
    
        connection.query('INSERT INTO users( firstname, lastname, user_name, email, p_w, solde, f_added) VALUES(?, ?, ?, ?, ?, 0, 0);', [ firstname, lastname, userName, email, pw ], (err, results) => {
            if (err) {
                throw err
            } else {
                res.status(201).json(results)
                console.log("Form submitted")
            }
        })
    })
    
} */

const register = (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const userName = req.body.userName
    const email = req.body.email
    const pw = req.body.pw
    if ( users.includes(Object.email === email)) {
        res.json({ message: 'The email is already in use'})
        if (!pw) {
            res.json({message :'Password dont match'})
        }
    } else {
        connection.query('INSERT INTO users( firstname, lastname, user_name, email, p_w, solde, f_added) VALUES(?, ?, ?, ?, ?, 0, 0);', [ firstname, lastname, userName, email, pw ], (err, results) => {
            if (err) {
                throw err
            } else {
                res.status(201).json(results)
                console.log("Form submitted")
            }
        })
    }
    
}

module.exports = register