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
  
  if(req.method === 'GET') {

    if (req.url.startsWith('/swim')) {
      var dequeuedMsg = messageQueue.dequeue()
      if( dequeuedMsg !== undefined){
        res.write(dequeuedMsg.toString())
      } else {
        res.write('')
      }
      res.end();
    } else {
      res.write('')
      // res.write(filename);
      res.end('')
    }
  
  }
  if (req.method === 'POST') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    })
    // make chunk into a buffer

    req.on('end', () => {
      var buf= Buffer.concat(body)
      var water = multipart.getFile(buf)
      console.log(water)
      fs.writeFile(this.backgroundImageFile, water.data, function(err) {
        if(err) {
          console.log('Something went wrong')
        } else {
          console.log('Saved!')
          res.end(`${module.exports.backgroundImageFile}/${water.filename}`);
        }
      })
    })
    res.end('')
  }
};

// save the file correctly on the server