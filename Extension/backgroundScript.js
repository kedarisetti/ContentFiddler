chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "parsetext"){
      getUrls(request, sender, sendResponse)
      return true;
    }
});

function getUrls(request, sender, sendResponse){
  $.ajax({
  type: "POST",
  cache: false,
  url: "http://localhost:8015/parsetext",
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
