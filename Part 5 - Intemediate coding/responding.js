var five = require("johnny-five"),
  ping, wheels, turning = false, board = new five.Board();

board.on("ready", function() {
    ping = new five.Ping(7);
    wheels = {};

    // Create two servos as our wheels
    wheels.left = new five.Servo({
      pin: 9,
      type: "continuous"

    });

    wheels.right = new five.Servo({
      pin: 10,
      type: "continuous",
      isInverted: true
    });

    wheels.both = new five.Servos().stop();

    ping.on("change", function() {
      var distance = this.cm;
      if (distance < 5 && !turning) {
        console.log('Avoiding obstacle at ' + distance + ' cm away');
        turning = true;
        // drive backwards
        wheels.both.ccw();
        board.wait(2000, function(){
          // at 2 seconds, turn
          wheels.left.cw();
          wheels.right.ccw();
        })
        board.wait(3000, function() {
          // at 3 seconds start driving forward again
          wheels.both.cw();
          turning = false;
        });
      }
    });
});
