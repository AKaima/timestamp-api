var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index.html')
})

app.get('/:id', function(req, res){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    if(req.params.id == parseInt(req.params.id, 10))
    {
        res.writeHead(200, { 'Content-Type': 'application/json' })  
        //var date = new Date(url.parse(req.url, true).query['iso'])
        var date = new Date()
        date.setTime(parseInt(req.params.id, 10) * 1000)
        res.end(JSON.stringify({
            "unixtime": date.getTime() / 1000,
            "natural": date.toLocaleString('en-US', options)
        }))
    }
    else
    {
        res.writeHead(200, { 'Content-Type': 'application/json' })  
        var date = new Date(req.params.id)
        res.end(JSON.stringify({
            "unixtime": date.getTime() / 1000,
            "natural": date.toLocaleString('en-US', options)
            
        }))
    }
})

app.listen(process.env.PORT)