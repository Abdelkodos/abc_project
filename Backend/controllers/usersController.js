const nodemailer = require('nodemailer')
const { connection, connect, disconnect } = require('../config/db')

const path = require('path')
const { addtoJ } = require('../middleware/logEvents')
const users = require('../model/users.json')

let transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'abc_marketing87@yahoo.com',
      pass: '6C98C0cb@**'
    }
})

connect()
const getAllUsers = (req, res) => {
    
    connection.query('SELECT * FROM users', (err, resultat) => {
        if (err) throw err
        res.status(201).json(resultat)
    })
}

const createNewUser = (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const userName = req.body.userName
    const email = req.body.email
    const pw = req.body.pw
    connection.query('INSERT INTO users( firstname, lastname, user_name, email, p_w, solde, f_added) VALUES(?, ?, ?, ?, ?, 0, 0);', [ firstname, lastname, userName, email, pw], (err, result) => {
        if (err) throw err
        res.status(201).json(result)
    })
}

const register = (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const userName = req.body.userName
    const email = req.body.email
    const pw = req.body.pw
    const randomn = Math.floor(Math.random()* 9999)
    let sltRes = []
    connection.query('SELECT email from users WHERE email = ?', [email], function (err, results) {
        if (err) {
            console.log(err)
        } else {
            sltRes = results
        }
        console.log(sltRes)
        if (sltRes.length === 0) {
            connection.query('INSERT INTO users( firstname, lastname, user_name, email, p_w, solde, f_added, active ) VALUES(?, ?, ?, ?, ?, 0, 0, false);', [firstname, lastname, userName, email, pw], (err, result) => {
                if (err)
                    throw err
                transporter.sendMail({
                    from: 'abc_marketing87@yahoo.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: 'Code de vérification: ' + randomn
                    }, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                })
                console.log(randomn)
                res.status(201).json(result)
                connection.query('SELECT * FROM users ORDER BY id DESC LIMIT 1', (err, results) => {
                    if (err) throw err
                    addtoJ([...users, results[0]], 'users.json')
                })
                
            })
        } else {
            res.status(401).json({message : 'bad regiterement'})
        }
    })
}

const login = (req, res) => {
    const email = req.body.email
    const pw = req.body.pw
    connection.query('SELECT * FROM users WHERE email = ? AND p_w = ?;', [ email, pw] , (err, results) => {
        if(err) throw err
        if( results.length > 0 ) {
            res.status(201).json({ results: results})
        } else {
            res.json({ message : 'Wrong email/password combination'})
        }
    })
}

const updateUser = (req, res) => {
    const id = req.body.id
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const userName = req.body.userName
    const email = req.body.email
    const pw = req.body.pw
    connection.query('UPDATE users SET firstname = ?, lastname = ?, user_name = ?, email = ?, p_w = ? HWERE id = ?;', [ firstname, lastname, userName, email, pw, id], (err, result) => {
        if (err) throw err
        res.status(201).json(result)
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err
        res.status(201).json(result)
    })
}

const getUser = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM users WHERE id = ?;', [id], (err, result) => {
        if (err) throw err
        res.json(result[0])
    })
}


module.exports = { getAllUsers,
                   createNewUser,
                   register,
                   login,
                   updateUser,
                   deleteUser,
                   getUser }