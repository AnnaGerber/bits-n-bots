var five = require("johnny-five"),
    myButton, led;
//five.Board({port: "/dev/tty.usbserial-A9GF3L9D" })
five.Board().on("ready", function() {
  myButton = new five.Button({
    pin: 2,
    isPullup: true
  });

  led = new five.Led(13);

  myButton.on("down", function(value){
    console.log("button pressed!");
    led.toggle();
  });

});
