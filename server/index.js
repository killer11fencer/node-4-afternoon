require('dotenv').config()

const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSessions')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const app = express()
const {SERVER_PORT,SECRET_SESSIONS} = process.env



app.use(express.json())
app.use(session({
  secret: SECRET_SESSIONS,
  resave:false,
  saveUninitialized: true}))
  app.use(checkForSession);
app.use(express.static(__dirname +'/build'))

app.get('/api/swag',swagCtrl.read)
app.post('/api/login',authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/checkout',cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id',cartCtrl.delete)

app.get('/api/search',searchCtrl.search)

app.listen(SERVER_PORT, () => console.log('listing on port', SERVER_PORT) )