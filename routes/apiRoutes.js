// var db = require("../models");
var SolrNode = require('solr-node');
 
// Create client
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'test',
    protocol: 'http'
});
 

module.exports = function(app) {
  // Get all examples
   app.get("/", function(req, res) {
    res.render("index");
  });
app.post("/api/songs",function(req,res){
  alert(req.body);
})
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
