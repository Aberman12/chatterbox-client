
var app = {
  init: function() {
    this.fetch();
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.fetch();
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    console.log('startead');
    var chat = $('.chat');
    var newEl = document.createElement('div');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: { order: '-createdAt' },
      // contentType: 'application/json',
      success: function (data) {
        console.log(data);
        data.results.forEach(function(item) {
            app.renderMessage(item);
          });
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages() {
    var chats = $('#chats');
    chats.html('');
  },

  renderMessage(message) {
    var chats = $('#chats');
    chats.append('<div id="message"><h4 onClick="app.addFriend()">' + message.username + '</h4><p>' + message.text + '</p></div>');
  },

  renderRoom(room) {
    var rooms = $('#roomSelect');
    rooms.append('<option value=' + room + '>' + room + '</option>');
  },

  mountMessages(data) {
    data.forEach(function(item) {
      console.log(item);
    });
  }
};


$(document).ready(function() {
  app.init();
});