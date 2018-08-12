
var app = {
  username: 'ahleckszahnder',
  roomname: $('#roomSelect').val(),
  friends: [],
  init: function() {
    this.fetch();
    setInterval(app.fetch.bind(app), 3000);
  },

  send: function(message) {
    console.log('heres the message insid esend', message);
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
          app.clearMessages();
        app.fetch();
        console.log('chatterbox: Message sent', data);
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
        var last;
        console.log('heres your data', data.results);
        data.results.forEach(item => {
          console.log('heres your items ', item);
          if (item.text !== last && item.text.indexOf('<') === -1 && item.text.length < 200) {
            console.log('made it through ',item);
            app.renderMessage(item);
          }
          last = item.text;
        });

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
    console.log(message);
    chats.append('<div id="message"><h4 id="' + message.username + '">' + message.username + ': </h4><p>' + message.text + '</p></div>');
    
    $('#' + message.username).on('click', function() {
      var name = message.username;
      console.log('made it to onclick', name);
      app.addFriend(name);
    });
  },

  addFriend(friend) {
    console.log('heres friend', friend);
    if (app.friends.indexOf(friend) === -1) {
      app.friends.push(friend);
      $('#friends').append('<p id="friend">' + friend + '</p>');
    }

  },
    
  createPostMessage() {
    var inputValue = $('#input');
    var messager = inputValue.val();
    var obj = {
      text: messager,
      username: app.username,
      roomname: app.roomname
    };
    console.log('heres your input value', messager);
    app.send(obj);
    inputValue.val('');
    event.preventDefault();
  },

  renderRoom(room) {
    var rooms = $('#roomSelect');
    var newRoom = $('#newRoom').val();
    rooms.append('<option value=' + newRoom + '>' + newRoom + '</option>');
    app.roomname = newRoom;
  },

//   mountMessages(data) {
//     data.forEach(function(item) {
//       console.log(item);
//     });
//   }
};

$(document).ready(function() {
  app.init();

  $('#input').keyup(function(event) {
    console.log('asdfasdfasdfasdfasdfasdf');
    if (event.keyCode === 13) {
      app.createPostMessage();
    }
  });

});

