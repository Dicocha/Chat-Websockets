const roomName = JSON.parse(document.getElementById('roomname').textContent);

const chatSocket = new WebSocket(
  'ws://' + window.location.host + '/ws/index/join/' + roomName + '/'
);

const currentUser = '{{ request.user.username }}';

chatSocket.onmessage = function(e) {

  const data = JSON.parse(e.data);
  const message = data.message;
  const username = data.username;

  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-bubble");
  messageElement.classList.add(username === currentUser ? "outgoing" : "incoming");

  const messageText = document.createElement("p");
  messageText.textContent = message;
  messageElement.appendChild(messageText);

  document.getElementById("cont-message").appendChild(messageElement);
  document.querySelector("main").scrollTop = document.querySelector("main").scrollHeight;
};

chatSocket.onclose = function (e) {
  console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
  if (e.key === 'Enter') {
    document.querySelector('#chat-message-submit').click();
  }
};

document.querySelector("#chat-message-submit").onclick = function() {
  const messageInputDom = document.querySelector("#chat-message-input");
  const message = messageInputDom.value;
  chatSocket.send(JSON.stringify({
      "message": message
  }));
  messageInputDom.value = "";
};


document.getElementById('inputImage').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    console.log('Selected file:', file.name);
    // Display the selected file name or handle it as needed
    // Example: display the file name in the chat input (you can customize this part)
    document.getElementById('chat-message-input').value = file;
  }
});