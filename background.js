//Set initial state of extension
var reloadState = {
  active: false,
  time: 5000 //Time in ms for reload timeout
}

//When extension is clicke, toggle the state of the extenstion
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("Clicked");

  //Select the tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    //Flip the state
    reloadState.active = !reloadState.active;
    //Send the updated state to the page
    chrome.tabs.sendMessage(activeTab.id, reloadState);

    if (reloadState.active) {
      chrome.browserAction.setIcon({path: "refresh_on.png", tabId: activeTab.id});
    } else {
      chrome.browserAction.setIcon({path: "refresh_off.png", tabId: activeTab.id});
    }
  });
});

//Listen for requests from page for state
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //If request is "getState"
    if (request.getState) {
      //Send state to page
      sendResponse(reloadState);
    }
  }
);
