// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
// var SolrNode = require("solr-node");
// var client = new SolrNode({
//   host: "aurora.cs.rutgers.edu",
//   port: "8181",
//   core: "discogs_data_test",
//   protocol: "http"
// });
var OAUTH2_CLIENT_ID ='144598218649-l78ovdbcde6bc30j11ac8bmjeqtbbuuj.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}
// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}


// var youtubeids = [];
// const express = require("express");
// const app = express();
// var strQuery = client
//   .query()
//   .q({ releaseDate: "2016" })
//   .sort({ viewcountRate: "desc" })
//   .start(0)
//   .rows(20);
//   console.log(strQuery);
// client.search(strQuery, function(err, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   // console.log("Response:", result.response.docs);
//   var docs = result.response.docs;
//   docs.forEach(element => {
//     youtubeids.push(element.youtubeId);
//   });
//   console.log(youtubeids);
//   return youtubeids;
// });

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}
// http://aurora.cs.rutgers.edu:8181/solr/#/discogs_data_test
// http://aurora.cs.rutgers.edu:8181/solr/discogs_data_test/select?q=*%3A*&wt=json&indent=true