// var db = require("../models");
var SolrNode = require('solr-node');
 
// Create client
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'test',
    protocol: 'http'
});
 
var info;
module.exports = function(app) {
  // Get all examples
   app.get("/", function(req, res) {
    res.render("index");
  });
app.post("/songs",function(req,res){
  console.log(req.body);
  info=req.body;
  
})
// app.get('/getProduct',
//  function (req, res) 
//  { 
// var strQuery = client.query().q('productId:9788700075740');
//  client.search(strQuery, function (err, result) {
//    if (err) {
//       console.log(err);
//       return;
//    }
//    console.log('Response:', result.response);
//    res.send(result.response);
// });
//  }); 
  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  //});
};
