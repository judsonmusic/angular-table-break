var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var open = require('open');
var cors = require('cors');
var morgan = require('morgan');
var htmlToPdf = require('html-to-pdf');
var router = express.Router();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



htmlToPdf.setDebug(true);
htmlToPdf.setInputEncoding('UTF-8');
htmlToPdf.setOutputEncoding('UTF-8');


app.use('/api', router);
router.route("/htmltopdf")
    .post(function(req, res){
        console.log(req.body);
        var html =  req.body.html || "This is a test";
        var fileName =  req.body.fileName || ("file_" + Math.random()) + '.pdf';

        htmlToPdf.convertHTMLString(html, fileName,
            function (error, success) {
                if (error) {
                    console.log('Oh noes! Errorz!');
                    console.log(error);
                    res.send(error);
                    res.end();
                } else {
                    console.log('Woot! Success!');
                    console.log(success);
                    res.send(success);
                    res.end();
                }
            }
        );


    });



app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb'}, {extended: true}));

app.use(express.static("app"));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/widgets-partner-test', express.static('widgets-partner-test'));

app.set('port', process.env.PORT || 8081);
app.listen(app.get("port"), function(){
        console.log("Express server listening on port " + app.get("port"));
        open("http://localhost:" + app.get("port"))
    });

module.exports = app;

