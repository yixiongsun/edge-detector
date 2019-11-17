const fs = require('fs');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  fs.readdir('./public/resources/', (error, files) => {
    let length = files.length
    res.render('home', {
      title: 'Home',
      images: length
    });
  })
};

