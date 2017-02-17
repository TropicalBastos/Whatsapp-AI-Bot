var date;
baseUrl = "http://api.program-o.com/v2/chatbot/?bot_id=6&say=";
//convoId = "&convo_id=" + Math.random();
//convoId = convoId.replace(/[.]+/,'');

var app = angular.module('screenApp',[]);

app.controller('headerCtrl',['$scope','$interval',
'$http',function($scope,$interval,$http){
  //realtime clock functionality
    $scope.time = get24Time();
    var tick = function(){
      $scope.time = get24Time();
    }
    $interval(tick,1000);

    //set the model for online/typing
    $scope.status = "Online";


    //event handler for input
    $scope.sendMessage = function(e){
      if(e.keyCode===13){
        var i = document.getElementsByClassName('input-message')[0];
        var message = i.value;
        if(message!=='' && !message.match(/^\s*$/)){
          i.value="";
          message = message.trim();
          var element = createMessage(message,'you');
          applyChat(element);
          getResponse(message);
      }
      }
    }

//get API chatbot response
    function getResponse(m){
      var element;
      setTimeout(function(){
        element = document.getElementById('status');
        element.classList.add("italic");
        $scope.status = "typing...";
      },300);
      var message = m.replace(/\s/g,'%20');
        $http.get('req.php?message='+message).then(function(data){
          $scope.status = "Online";
          element.classList.remove("italic");
          var el = createMessage(data.data.botsay,'bot');
          applyChat(el);
        });
    }
}]);

function get24Time(){
  date = new Date();
  var hourStr = date.getHours();
  if(date.getHours()<10){
    hourStr = "0"+hourStr;
  }
  if(date.getMinutes()<10){
    return hourStr+":"+"0"+date.getMinutes();
  }else{
  return hourStr+":"+date.getMinutes();
}
}

//creates the message div and adds text to it
function createMessage(m,s){
  if(s==='you'){
    var e = document.createElement('div');
    e.classList.add("chat-message-you");
    e.textContent = m;
    return e;
  }else{
    var e = document.createElement('div');
    e.classList.add("chat-message-bot");
    var me = m.replace(/female/g,'male');
    e.textContent = me.replace(/Program-O/g,'Silvestre');
    return e;
  }
}

//applies all necessary clearfixes and appends the chat elements
function applyChat(element){
  var chatbox = document.getElementsByClassName('chat')[0];
  chatbox.append(element);
  var clearfix = document.createElement('div');
  clearfix.classList.add('clearfix');
  chatbox.append(clearfix);
  chatbox.scrollTop = chatbox.scrollHeight;
}
