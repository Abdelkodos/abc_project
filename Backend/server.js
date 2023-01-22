const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 3200

// custom middleware logger
app.use(logger)

// Cross origin ressources sharing
app.use(cors(corsOptions))

// using body-parser as a middleware
app.use(bodyParser.urlencoded({ extended: true}))

// built-in middleware for json
app.use(bodyParser.json())

// routes
app.use('/', require('./routes/api/users'))
// app.use('/users/register', require('./routes/api/auth'))
app.use('/mainp(.html)?', require('./routes/api/login'))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})