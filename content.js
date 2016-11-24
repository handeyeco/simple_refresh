var reloadState, currentTimeout;

//Reload page on timeout
function handleTimeout() {
  location.reload();
}

//Set a timeout or remove timeout based on state
function toggleTimeout() {
  if (reloadState.active) {
    currentTimeout = window.setTimeout(handleTimeout, reloadState.time);
  } else {
    window.clearTimeout(currentTimeout);
  }
}

//Handler for updating page state and calling toggleTimeout
function handleMessage(request) {
  reloadState = request;
  toggleTimeout();
}

//Listen for extension state to change
chrome.runtime.onMessage.addListener(handleMessage);

//Ask for state on load or reload
chrome.runtime.sendMessage({getState: true}, function(response) {
  handleMessage(response);
});
