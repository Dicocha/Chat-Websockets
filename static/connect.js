const chatSocket = new WebSocket(`ws://${window.location.host}/ws/socket-server`)

chatSocket.onmessage = function(message) {
    let data = JSON.parse(message.data)

    console.log('Data: ', data)
}