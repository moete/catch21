define(["UI", "UI/Modal", "underscore"], function (UI, Modal, _) {
  "use strict";
  var self;
  return {
    initialize: function () {

      self = this;
      this.socket = io.connect(`https://${window.location.hostname}`, {
        path: "/duelSocket",
      });
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      gameCode = urlParams.get("game");
      userId = urlParams.get("userId");
      this.socket.on("connect", () => {
        console.log("connected ", this.socket.id)

        this.socket.on(userId, this.handleUserEvent);
        this.socket.emit("getState", { userId, roomName: gameCode });

      });
    },
    getSocket: function () {
      return this.socket;
    },
    handleInitState: function (payload) {
      if (!payload.data) {
        window.location.href = frontUrl;
        return;
      }
      const state = payload.data.state,
        playerOne = payload.data.playerOne ? payload.data.playerOne : "unknown",
        playerTwo = payload.data.playerTwo ? payload.data.playerTwo : "unknown";
      if (state) {
        const options = state.options;
        options.startTime = payload.data.startTime;
        options.endTime = payload.data.endTime;
        options.randomNumbers = state.randomNumbers;
        options.gameCode = gameCode;
        options.playerOne = playerOne;
        options.playerTwo = playerTwo;
        UI.initialize(options, this.socket);
        loading.remove();
      } else window.location.href = frontUrl;
    },
    handleFinaleScore: function (payload) {
      var data = _.clone({});
      data.amount = payload.game.amount * 2;
      data.amount = parseFloat(data.amount - data.amount * 0.18).toFixed(3);
      data.matchId = payload.game._id;
      data.stats = [];
      payload.clients.map((client) => {
        data.stats.push({
          name: client.name,
          point: client.score.score,
        });
      });
      Modal.open("finaleScore", {
        stats: data.stats,
        amount: data.amount,
        matchId: data.matchId,
      });
    },
    handleUserEvent: function (payload) {
      console.log("handleUserEvent ", payload)
      switch (payload.type) {
        case "initState":
          self.handleInitState(payload);
          break;
        case "gameEnd":
          self.handleFinaleScore(payload.data);
          break;
      }
    },
  };
});
