var OAUTH2_CLIENT_ID = '144598218649-cs7ktbbd4q7ghanjvbluj51d5vt9djok.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];
var videoids;

googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

function checkAuth() {
  console.log("I auth");
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

function handleAuthResult(authResult) {
  console.log("in auth res")
  if (authResult && !authResult.error) {

    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    $('#login-link').click(function () {
      console.log("In click");
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
      }, handleAuthResult);
    });
  }
}

function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function () {
    console.log("in client loaded")
    handleAPILoaded();
  });
}

function handleAPILoaded() {
  enableForm();
}
// Enable the form for creating a playlist.
function enableForm() {
  $("#playlist-button").attr("disabled", false);
}

$("#playlist-button").on("click", function () {
  var title = $("#Title").val();
  var description = $("#Description").val();
console.log(title,description)
  var request = gapi.client.youtube.playlists.insert({
    part: "snippet,status",
    resource: {
      snippet: {
        title: title,
        description: description
      },
      status: {
        privacyStatus: "public"
      }
    }
  });
  request.execute(function(response) {
    var result = response.result;
    console.log(result);
    if (result) {
      playlistId = result.id;
      // console.log(playlistId)
      $("#playlist-id").val(playlistId);
      $("#playlist-Id").html(result.id);
    } else {
      $("#status").html("Could not create playlist");
    }
  });

})
$("#Addvideo").on("click", function () {
  var result = {
    id: $("#playlist-id").val(),
    year: $("#year").val(),
    videoid: $("#video-id").val()
  }
  console.log(result);
  $.post("/songs", result, function (data) {
    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    console.log("data posted to routes");
    console.log("incoming data", data);
    addVideosToPlaylist();
    //   videoids.forEach(element => {
    //     // youtubeids.push(element.youtubeId);
    //     console.log(element);
    //     // addToPlaylist(element);
    //  myLoop(element)
    //   });
    var counter = 0;
    function addVideosToPlaylist() {
      myLoop(data[0]);
    }
    function myLoop(video_id) {
      addToPlaylist(video_id);
      setTimeout(function () {
        counter++;
        if (counter < data.length)
console.log(data[counter])
          myLoop(data[counter]);
      }, 1500);
    }
  })

  function addToPlaylist(id, startPos, endPos) {

    var playid = $("#playlist-id").val();
    console.log(
      "in addToPlaylist with " + id + "sending to playlist : " + playid
    );
    var details = {
      playlistId: playid,
      videoId: id,
      kind: "youtube#video"
    };
    console.log(details);
    if (startPos != undefined) {
      details["startAt"] = startPos;
    }
    if (endPos != undefined) {
      details["endAt"] = endPos;
    }
    // console.log(playlistId);
    var request = gapi.client.youtube.playlistItems.insert({
      part: "snippet",
      resource: {
        snippet: {
          playlistId: details.playlistId,
          resourceId: details
        }
      }
    });
    //console.log(request)
    request.execute(function(response) {
      $("#status").append("<pre>" + JSON.stringify(response.result.id) + "</pre>" + "<br />");
    });
  }

  // function addTheseVideosToPlaylist() {
  //   var links = youtubeids;
  //   var counter = 0;

  //   function addVideosToPlaylist() {
  //     myLoop(links[0]);
  //   }

  //   function myLoop(video_id) {
  //     addToPlaylist(video_id);
  //     setTimeout(function () {
  //       counter++;
  //       if (counter < links.length) myLoop(links[counter]);
  //     }, 3000);
  //   }
  // }
})