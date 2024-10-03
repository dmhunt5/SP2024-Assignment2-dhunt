var len;
var results = '';

var pictureId = 0;

const pictures = ["david-clode-D7L5rX48OtI-unsplash.jpg", "david-clode-iIdB2wm9TiY-unsplash.jpg", "david-clode-PteQb2-8rmY-unsplash.jpg"]

$(function () {
    $("#dialog-message").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

});

function getTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentTime = `${hours}:${minutes}`;
    document.getElementById("dialog-message").innerHTML = `<p>${currentTime}</p>`;

    $("#dialog-message").dialog("open");

};

function changeBackground() {
    if(pictureId >= 3) {
        pictureId = 0;
    }

    document.getElementById("background").style.backgroundImage = `url('${pictures[pictureId]}')`
    pictureId++;
}

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "2a725226abca4ec48bafd227d3030c3f");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });

    document.getElementById("searchResults").style.visibility = `visible`;
}

function lucky() {
    var params = {
        "q": $("#query").val(),
        "count": "1",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "2a725226abca4ec48bafd227d3030c3f");
        },
        type: "GET",
    })
        .done(function (data) {
            document.location.href = data.webPages.value[0].url;
        })
        .fail(function () {
            alert("error");
        });

}