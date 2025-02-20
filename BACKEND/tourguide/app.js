var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http =require('http');
require("dotenv").config();
// console.log(process.env);


console.log(process.env.URL_MONGO); 


const {connectToMongoDB} = require("./db/db");
//connectToMongoDB();

const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const osRouter = require('./routes/osRouter');
const contactRouter = require('./routes/contactRouter');
const authRouter  = require('./routes/authRouter');
const  touristRouter = require('./routes/touristRouter');
const  guideRouter = require('./routes/guideRouter');
const  superAdmin = require('./routes/superAdminRouter');
const  tour = require('./routes/tourRouter');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/apicontact', contactRouter);
app.use('/apiauth', authRouter);
app.use('/apitourist', touristRouter);
app.use('/apiguide', guideRouter);
app.use('/apiguide', guideRouter);
app.use('/apisuperadmin', superAdmin);
app.use('/apitour', tour);



//  gérer les erreurs 404
app.use(notFoundHandler);

//  gérer les autres erreurs
app.use(errorHandler);


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page

//   res.status(err.status || 500);
//   res.render('error');
// });

const server = http.createServer(app);
server.listen(process.env.PORT,()=>{
  connectToMongoDB(),console.log("🚀App is runnig on port 5000🚀")
});
