const WebSocket = require('ws');
const axios = require('axios');
const EventEmitter = require('events');

class WebSocketManager {
  constructor(client) {
    this.client = client;
    this.eventEmitter = new EventEmitter();
    this.ws = null;
    this.heartbeatInterval = null;
  }

  connect() {
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
    this.ws.on('open', () => {
      console.log('Connected to the Discord Gateway!');
      this.ws.send(JSON.stringify(this.getGatewayData()));
      this.startHeartbeat();
    });

    this.ws.on('message', async (data) => {
      const payload = JSON.parse(data);
      require('../utils/Emit')(this, payload)
    });

    this.ws.on('close', () => {
      
      this.stopHeartbeat();
    });
  }

  getGatewayData() {
    return {
      op: 2,
      d: {
        token: this.client.token,
        intents: this.client.options.intents,
        properties: {
          $os: 'linux',
          $browser: 'my_library',
          $device: 'my_library'
        }
      }
    };
  }

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.ws.send(JSON.stringify({ op: 1, d: null }));
    }, 30000);
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatInterval);
  }

  on(event, handler) {
    this.eventEmitter.on(event, handler);
  }
}

module.exports = WebSocketManager;

