var five = require("johnny-five"),
        board = new five.Board();
board.on("ready", function() {
    var ping = new five.Ping(7);
    ping.on("change", function() {
        console.log('Detected object at ' + this.cm + ' cm away');
    });
});
