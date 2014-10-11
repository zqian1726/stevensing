var http = require('http')
	, path = require('path')
	, express = require('express')
	, app = express()
	, favicon = require('serve-favicon')
	, logger = require('morgan')
	, methodOverride = require('method-override')
	, session = require('express-session')
	, bodyParser = require('body-parser')
	, multer = require('multer')
	, errorHandler = require('errorhandler')

// access port: 3000
app.set('port', process.env.PORT || 3000)

// set view dir and engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// use middlewares in connect
app.use(favicon(__dirname + '/public/images/favicon.ico'))
app.use(logger('dev'))
app.use(methodOverride()) // enable RESTful requests
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static(path.join(__dirname, 'public')))// render CSS, JS and images

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler())
}

/*
 *	Routing
 */
app.route('/user')
	.get(function(req, res) {
    res.send('Get a random book')
  })
  .post(function(req, res) {
    res.send('Add a book')
  })
  .put(function(req, res) {
    res.send('Update the book')
  })

// start server
var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})