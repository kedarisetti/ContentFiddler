chrome.runtime.sendMessage({type: "parsetext", data: getContent()}, function(response){
updateContent(response)});


function getContent (){
        var arr = [];
        for(var i = 0;i < document.getElementsByTagName('p').length;i++) {
          arr.push(document.getElementsByTagName('p')[i].textContent);
        }
        arr = arr.join(' ');
        data = arr.replace(/(\r\n|\n|\r)/gm,".");
        console.log(data)
        return data
}

function updateContent(response)
{
    obj = response;
    var sentences = [];
    for (var i = 0; i < obj.length; i++) {
      object = obj[i];
      var sentence = Object.keys(object)[0];
      if (undefined == sentence) {
        return
      }
      var sentObj = object[Object.keys(object)[0]];
      var newSent = sentence;
      for (var property in sentObj) {
        if (sentObj.hasOwnProperty(property)) {
          var newpart = "<span title=\""+property+"\"><mark>"+sentObj[property]+"</mark></span>";
          var tempSent = newSent;
                newSent = newSent.split(property).join(newpart);
                document.body.innerHTML = document.body.innerHTML.replace(tempSent.trim(), newSent.trim());
        }
      }
      sentences.push(newSent);
    }
}