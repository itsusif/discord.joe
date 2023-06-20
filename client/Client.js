require("dotenv").config();
const WebSocketManager = require('./WebSocketManager');

class DiscordClient {
  constructor(token, options) {
    this.token = token;
    this.options = options;
    this.websocketManager = new WebSocketManager(this);
  }

  connect() {
    this.websocketManager.connect();
  }

  fetchGuild(guildId) {
    return this.websocketManager.fetchGuild(guildId);
  }

  on(event, handler) {
    this.websocketManager.on(event, handler);
  }
}

module.exports = DiscordClient;