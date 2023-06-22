const WebSocket = require('ws');
const EventEmitter = require('events');

class WebSocketManager {
  constructor(client) {
    this.client = client;
    this.eventEmitter = new EventEmitter();
    this.ws = null;
    this.heartbeatInterval = null;
    this.sessionId = null;
    this.seq = null;
    this.resumeAttempts = 0;
  }

  connect() { 
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
    this.ws.on('open', () => {
      console.log('Connected to the Discord Gateway!');
      this.ws.send(JSON.stringify(this.getGatewayData()));
      this.startHeartbeat();
    });

    this.ws.on('message', async (data) => {
      const payload = JSON.parse(data);
      if (payload.s !== null) this.seq = payload.s;
      require('../utils/Emit')(this, payload);
    });

    this.ws.on('close', (code) => {
      console.log(`Disconnected with code ${code}`);
      this.stopHeartbeat();
      if (code === 4004 || code === 4010) {
        console.log('Invalid token or shard. Please check your credentials.');
        return;
      }

      this.resumeWebSocket();
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
      this.ws.send(JSON.stringify({ op: 1, d: this.seq }));
    }, 30000);
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatInterval);
  }
  resumeWebSocket() {
    if (this.resumeAttempts > 5) {
      console.log('Resume failed. Exceeded maximum resume attempts.');
      return;
    }

    this.resumeAttempts++;

    setTimeout(() => {
      console.log('Attempting to resume WebSocket connection...');
      this.ws = new WebSocket(`wss://gateway.discord.gg/?v=10&encoding=json&session_id=${this.sessionId}&seq=${this.seq}`);
      this.ws.on('open', () => {
        console.log('WebSocket connection resumed successfully!');
        this.startHeartbeat();
        this.resumeAttempts = 0;
      });

      this.ws.on('message', async (data) => {
        const payload = JSON.parse(data);
        if (payload.s !== null) this.seq = payload.s;
        require('../utils/Emit')(this, payload);
      });

      this.ws.on('close', (code) => {
        console.log(`Disconnected with code ${code}`);
        this.stopHeartbeat();
        if (code === 4004 || code === 4010) {
          // Invalid token or shard
          console.log('Invalid token or shard. Please check your credentials.');
          return;
        } else if (code === 1006) {
          // Abnormal closure
          console.log('Connection closed abnormally. Attempting to reconnect...');
          this.resumeWebSocket();
        } else {
          // Other close codes
          console.log('WebSocket connection closed with an unexpected code. Code:', code);
          this.resumeWebSocket();
        }
      });
    }, 5000);
  }

  on(event, handler) {
    this.eventEmitter.on(event, handler);
  }
}

module.exports = WebSocketManager;
