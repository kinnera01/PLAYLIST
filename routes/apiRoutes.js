// var db = require("../models");
var SolrNode = require('solr-node');
 
// Create client
var client = new SolrNode({
  host: "aurora.cs.rutgers.edu",
    port: "8181",
    core: "discogs_data_test",
    protocol: "http"
});
var queryclient = new SolrNode({
  host: "aurora.cs.rutgers.edu",
    port: "8181",
    core: "similar_genres",
    protocol: "http"
});
var youtubeids = [];
//ar info;
module.exports = function(app) {
  // Get all examples
   app.get("/", function(req, res) {
    res.render("index");
  });
app.post("/songs",function(req,res){
  console.log(req.body)
  var strQuery = client
  .query()
  .q({ releaseDate: req.body.year,artistName:req.body.genre })
  .sort({ viewcountRate: "desc" })
  .start(0)
  .rows(20);
  // console.log(strQuery);
client.search(strQuery, function(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  // console.log("Response:", result.response.docs);
  var docs = result.response.docs;
  docs.forEach(element => {
    youtubeids.push(element.youtubeId);
  });
   console.log(youtubeids);
   res.send(youtubeids);
});
})
app.get("/genres",function(req,res){
  var strQuery = queryclient
  .query()
  .q({ '*' : '*' })
  .fl('artistName')
  .start(0)
  .rows(2147483647);
   queryclient.search(strQuery, function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    // console.log("Response:", result.response.docs);
    res.send( result.response.docs)
  });
})
};
