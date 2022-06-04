var stompClient = null;
var ClientIdentifire = null;
var ClientDestinationIdentifire = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);

    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/GympinChatEndPoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat/'+ClientIdentifire+'/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });
        $("#messageSection").removeAttr("hidden");
        $("#userId").parent().attr("hidden","");
        $("#destinationUserId").parent().attr("hidden","");
        $("#chatSection").removeAttr("hidden");
    });
}
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");

    $("#messageSection").attr("hidden","");
    $("#userId").parent().removeAttr("hidden");
    $("#destinationUserId").parent().removeAttr("hidden");
    $("#chatSection").attr("hidden","");
}
function sendName() {
    var message =  { 'foo': $("#name").val(), 'bar': $("#name").val(), 'baz': $("#name").val() }

    var data = JSON.stringify(message)
    stompClient.send("/app/hello/"+ClientDestinationIdentifire, {},data );

    $("#greetings").prepend("<tr><td style='background: #e9ffe9;'>" + message.foo+ "</td></tr>");
}
function showGreeting(data) {
    $("#greetings").prepend("<tr><td  style='background: #f0f8ff;'>" + data.foo+ "</td></tr>");
}
$(function () {
    $( "form" ).on('submit', function (e) {e.preventDefault();});
    $( "#connect" ).click(function() {
        ClientIdentifire = $("#userId").val();
        ClientDestinationIdentifire = $("#destinationUserId").val();
        connect();
    });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
