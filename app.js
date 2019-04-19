const http = require('http');
var Router = require('router')
var finalhandler = require('finalhandler')

const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const imagesArray = fs.readdirSync('./assets');
console.log(imagesArray)


var router = Router()
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(imagesArray))
})

router.get('/:filename', function (req, res) {
    res.statusCode = 200
    const filename = req.params.filename;
    console.log(filename)
    res.setHeader('Content-Type', 'image/jpg')
    fs.readFile(`./assets/${filename}.jpg`, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.end(data)
      });
    // with respond with the the params that were passed in
  })

var server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res))
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://,${hostname}:${port}/`);
});
