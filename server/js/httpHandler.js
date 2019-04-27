const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// const urlLib = require('url');
const messageQueue = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

var directions = ['up', 'down', 'left', 'right'];

module.exports.router = (req, res, next = ()=>{}) => {
  // res.write(directions[Math.floor((Math.random() * directions.length))]);

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  // var parts = urlLib.parse(req.url, true);
  // var query = parts.query
  // if (query.direction !== undefined) {
  //   res.write(query.direction);
  // }
  if(messageQueue.dequeue() !== undefined){
    res.write(messageQueue.dequeue().toString())
  } else {
    res.write('')
  }
  res.end();
};
