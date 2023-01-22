const express = require('express')
const mysql = require('mysql')
const msqlEscape = (target) => mysql.escape(target)

const dbRefs = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cpapdb'
}

const connection = mysql.createConnection(dbRefs)

const connect = () => {
    connection.connect()
}

const disconnect = () => {
    connection.end()
}

module.exports = { connection, connect, disconnect, msqlEscape }