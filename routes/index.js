/*
 * home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

// app.get('/', routes.index);


// app.get('index512', function (req, res) {
//   res.sendFile(path.join(__dirname, '/views/html/index512.html'));
// });