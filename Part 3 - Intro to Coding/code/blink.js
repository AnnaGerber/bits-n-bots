var j5 = require("johnny-five");
var myBoard, myLed;

myBoard = new j5.Board();
//myBoard = new j5.Board({port: "/dev/tty.usbserial-A9GF3L9D" });

myBoard.on("ready", function() {

  myLed = new j5.Led(13);

  // strobe every second
  myLed.strobe( 1000 );

  // make myLED available as "led" in REPL

  this.repl.inject({
      led: myLed
  });

  // try "stop" (stops strobing), "on", "off", "toggle", "strobe"
});
