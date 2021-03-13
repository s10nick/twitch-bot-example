const express        = require("express")
const bodyParser     = require("body-parser")
const session  = require("express-session")
const path       = require("path")
const app = express()
const mongoose = require('mongoose')
const dbconnection = mongoose.createConnection(process.env.MONGO_URL)
const server  = require("http").createServer(app)

const MongoStore  = require('connect-mongo')(session)

const passport = require('./config/passport')
const Users = require('./models/Users')
const Messages = require('./models/Messages')
const Bots = require('./models/Bots')
const Triggers = require('./models/Triggers')

sessionMiddleware = session({
  secret: 'channel-name',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: dbconnection })
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
mongoose.connect(process.env.MONGO_URL)
mongoose.set('debug', true)
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/twitch', passport.authenticate('twitch'))

app.get(
  '/auth/twitch/callback', 
  passport.authenticate(
    'twitch', { 
      failureRedirect: '/' 
  }), 
  function(req, res) {
    res.redirect('/')
})

app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

app.get('/user', function (req, res) {
  if (!req.isAuthenticated()) res.redirect('/')
  res.json(req.user)
})

app.get('/', function (req, res) { 
  res.render("index") 
})
app.get('/api/v0/message/save', function (req, res) { 
  messages = new Messages({
    channels: ['channel-name'],
    status: true,
    message: 'test message',
    minDelay: 10,
    minChatMessages: 3
  })

  messages.save(function (err) {
    if (err) return res.status(500).json({err: err})
    return res.status(200).json({msg: 'Successfully saved message'})
  })
})

app.get('/api/v0/messages', async function (req, res) { 
  try {
    const results = await Messages.find({});
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get('/api/v0/bots', async function (req, res) { 
  try {
    const results = await Bots.find({});
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get('/api/v0/m/create', async function (req, res) { 
  try {
    const bots = await new Bots({
      twitchOauth2token: process.env.BOT_OAUTH,
      channels: ['1']
    })
  
    bots.save(function (err) {
      if (err) return res.status(500).json({err: err})
      return res.status(200).json({msg: 'Successfully saved bot'})
    })
  } catch (err) {
    res.status(500).json(err)
  }
})
const socket = require('socket.io')
const io = socket().listen(server)
io.set('autoConnect', false)

io.origins((origin, next) => {
  console.log(origin)
  next(null, true)
})

io.use(function(socket, next){
  sessionMiddleware(socket.request, {}, next);
})
io.on("connection", function(socket){
  if(socket.request.session.passport) {
    io.sockets.emit('user',{ 
      auth: true, 
      twitchId: socket.request.session.passport.user.twitchId
    })
  } else {
    io.sockets.emit('user',{ 
      auth: false, 
      twitchId: null
    }) 
  }
})

server.listen(80)
