var app = null;
window.onload = function() {
	app = new Vue({
		el: '#app',
		data: {
			connection: null,
			message: '',
			messages: []
		},
		created: function(){
			this.init();
		},
		methods: {
			init: function() {
				// this.connection = new WebSocket('ws://127.0.0.1:4444');
				this.connection = new WebSocket('ws://vanjoni.ru:4444');
				// this.connection = new WebSocket('ws://192.168.245.152:4444');

				var _this = this;
				this.connection.onopen = function () {
				    console.log('Connected!');
				    _this.connection.send('Ping'); // Send the message 'Ping' to the server
				};

				// Log errors
				this.connection.onerror = function (error) {
				    console.log('WebSocket Error ' + error);
				};

				// Log messages from the server
				this.connection.onmessage = function (e) {
				    // console.log('Server: ' + e.data);
				    _this.messages.push(e.data);
				};

				this.connection.onclose = function () {
					console.log('Connection closed!');
				};
			},
			sendMessage: function() {
				console.log(this.message);
				if(this.message !== '') {
					this.connection.send(this.message);
					this.message = '';
				}
			}
		}
	});
};