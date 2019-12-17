const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = 3000
const session = require('express-session')
const passport = require('passport')

const db = require('./models')
const Todo = db.Todo
const User = db.User
app.use(session({
  secret: 'Iloveyou',
  resave: 'false',
  saveUninitialized: 'false',
}))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

//設定路由
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/todos', require('./routes/todo'))




app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})