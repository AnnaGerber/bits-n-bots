// See https://github.com/rwaldron/johnny-five/blob/master/docs/servo-drive.md
var five = require("johnny-five"),
  board, wheels;

board = new five.Board();

board.on("ready", function() {

  wheels = {};

  // Create two servos as our wheels
  wheels.left = new five.Servo({
    pin: 9,
    type: "continuous"

  });

  wheels.right = new five.Servo({
    pin: 10,
    type: "continuous",
    isInverted: true // one wheel mounted inverted of the other
  });

  wheels.both = new five.Servos().stop(); // reference both together

  // Add servos to REPL (optional)
  this.repl.inject({
    wheels: wheels
  });

  // Drive forwards
  // Note, cw() vs ccw() might be different for you
  // depending on how you mount the servos
  wheels.both.cw();

  // Stop driving after 3 seconds
  this.wait(3000, function() {
    wheels.both.stop();
  });

});
