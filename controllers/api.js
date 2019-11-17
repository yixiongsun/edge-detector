const fs = require('fs');
const path = require('path');
const { spawn }  = require('child_process');




/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};




/**
 * GET /api/upload
 * File Upload API example.
 */

exports.postFileUpload = (req, res) => {

  let file = req.file.path


  fs.readdir('./public/resources/', (error, files) => {
    let length = files.length
    fs.renameSync("./" + file, "./public/resources/img" + (length + 1) + ".jpg")
    res.redirect('/')
  })


};

exports.boundary = (req, res) => {
  let x = req.body.x
  let y = req.body.y
  let file = req.body.file.split("/")
  let filePath = "./public/resources/" + file[file.length - 1]
  
  console.log("/Users/yixiongsun/Desktop/CodeJam\ 2019/venv/bin/python /Users/yixiongsun/Desktop/CodeJam\ 2019/demo.py ",x,  y, filePath)
  let child = spawn("/Users/yixiongsun/Desktop/CodeJam\ 2019/venv/bin/python", ["/Users/yixiongsun/Desktop/CodeJam\ 2019/demo.py", x, y, filePath])


  child.on('exit', function (code, signal) {
    console.log('child process exited with ' + `code ${code} and signal ${signal}`);
    fs.readFile(path.resolve("out.jpg"), (err, data) => {

      let base64Image = new Buffer(data, 'binary').toString('base64');
  
      let imgSrcString = `data:image/jpg;base64,${base64Image}`;
  
      res.send(imgSrcString);
    })
    

  });

}

