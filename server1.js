//var http = require('http');
//var fs = require('fs');

//const PORT = 8080;

//fs.readFile('./index.html', function (err, html) {

//    if (err) throw err;

//    http.createServer(function (request, response) {
//        response.writeHeader(200, { "Content-Type": "text/html" });
//        response.write(html);
//        response.end();
//    }).listen(PORT);
//});

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = '\\tmp\\' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);