chrome.runtime.onMessage.addListener(function(newSpeed) {
  var newSpeed = newSpeed.data || {};

  if (newSpeed > 16) {
    alert("Sorry, videos can't play higher than 16x speed");
  } else if (newSpeed < 0.0625) {
    alert("Sorry, videos can't play less than 0.0625x speed")
  } else {
    var video = document.getElementsByTagName("video")[0];
    video.playbackRate = newSpeed;
  }
});