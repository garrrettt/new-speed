var currentCustomSpeed = 1;
var ENTER = 13;

loadAndSetCurrentSpeed();

function loadAndSetCurrentSpeed() {
  chrome.storage.sync.get(['speed'], function(data) {
    document.getElementById('customSpeed').placeholder = data.speed || 1;
  
    currentSpeed = data.speed;
  });
}

function setSpeed(speed) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: speed});
  });
}

function setCustomSpeed(speed) {
  setSpeed(speed);

  chrome.storage.sync.set({'speed': speed});
  
  loadAndSetCurrentSpeed();
}

document.getElementById('changeColor').addEventListener('click', function() {
  var newSpeed = getCustomSpeed();

  setCustomSpeed(newSpeed);
});

document.getElementById('customSpeed').addEventListener('keydown', function(e) {
  var newCustomSpeed = getCustomSpeed();

  if (e.keyCode == ENTER) {
    setCustomSpeed(newCustomSpeed);
  }
});

document.getElementById('customSpeed').addEventListener('focus', function() {
  var checkboxes = document.querySelectorAll('[type="radio"]');

  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
});

document.getElementById('presetRadioButtons').addEventListener('click', function(e) {
  if (e.target.classList.contains('speedPresetRadio')) {
    var el = e.target;
    var speed = el.getAttribute('speed');

    // we give each HTML element a speed attribute manually
    setSpeed(speed);
  }
})

function getCustomSpeed() {
  var input = document.getElementById('customSpeed');

  if (input.value.length > 0) return Number(input.value)
  else return currentCustomSpeed;
}