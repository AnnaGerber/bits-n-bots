var five = require("johnny-five"),
  board, photores;

board = new five.Board();
//board = new five.Board({port: "/dev/tty.usbserial-A9GF3L9D" });

board.on("ready", function() {
  photores = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  board.repl.inject({
    p: photores
  });

  photores.on("data", function(err, value) {
    console.log("light reading is " + value);
    var brightnessValue = five.Fn.constrain(five.Fn.map(value, 0, 900, 0, 255), 0, 255);
    myLed.brightness(brightnessValue);
  });
});
