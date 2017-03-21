var enabled = false;

chrome.browserAction.onClicked.addListener(
    function(){
        enabled = !enabled;
        if (enabled)
        {
            console.log("Extension Now Enabled");
            chrome.browserAction.setIcon({path:"icon_en.png"});
        }
        else
        {
            console.log("Extension is now Disabled");
            chrome.browserAction.setIcon({path:"icon_de.png"});
            //chrome.browserAction.setPopup({popup: ""});

        }


    });
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "parsetext" && enabled){
      getUrls(request, sender, sendResponse)
      return true;
    }
});

function getUrls(request, sender, sendResponse){
  $.ajax({
  type: "POST",
  cache: false,
  url: "https://quiet-fjord-47215.herokuapp.com:8015/parsetext",
  // The key needs to match your method's input parameter (case-sensitive).
  data: {"paragraphs": request.data},
  dataType: "json",
  success: function(d){
     console.log(d);
     sendResponse(d);
   },
  failure: function(errMsg) {
      console.log(errMsg);
  }
 });
}
