//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/"event-plan-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/event-plan-app/index.html'));
});

// Heroku automagically gives us SSL
// Lets write some middleware to redirect us
let env = process.env.NODE_ENV || 'development';

let forceSSL = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSSL);
}

//const path = require('path');
//app.get('/*', function(req,res) {
//res.sendFile(path.join(__dirname+'/dist/index.html'));
//});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);