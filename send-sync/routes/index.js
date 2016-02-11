var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

router.get('/', function(req, res, next) {

  var fooPromise = renderFoo(res, true);
  var barPromise = renderBar(res, true);
  
  Promise.all([fooPromise, barPromise]).then(function(results){
    var fooResult = results[0];
    var barResult = results[1];
    res.render('index', { title: 'the mashup of Foo and bar', foo: fooResult, bar: barResult });
  });
});

function renderFoo(res, skipLayout) {
  return new Promise(function(resolve, reject) {
    res.render('foo', {title: 'Foo', layout: !skipLayout}, function(err, html) {
      resolve(html);
    });
  });
}

router.get('/foo', function(req, res) {
  renderFoo(res).then(function(html) {
    res.send(html);
  });
});

function renderBar(res, skipLayout) {
  return new Promise(function(resolve, reject) {
    res.render('bar', {title: 'Bar', layout: !skipLayout}, function(err, html) {
      resolve(html);
    });
  });
}

router.get('/bar', function(req, res) {
  renderBar(res).then(function(html) {
    res.send(html);
  });
});

module.exports = router;
