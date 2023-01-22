// Cross Origin Ressource Sharing
const whitelist = [
    'http://localhost:5173',
    'http://127.0.0.1:5500', 
    'http://localhost:3200',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionSuccessStatus: 200
}


module.exports = { corsOptions }