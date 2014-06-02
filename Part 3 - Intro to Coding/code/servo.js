var five = require("johnny-five"),
board, myServo;
//board = new five.Board({port: "/dev/tty.usbserial-A9GF3L9D" });
board = new five.Board();
board.on("ready", function() {
  myServo = new five.Servo(6);

  board.repl.inject({
    servo: myServo
  });

  myServo.sweep();

  this.wait(5000, function(){
    myServo.stop();
    myServo.center();
  });
});
