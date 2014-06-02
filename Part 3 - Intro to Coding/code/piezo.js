var five = require("johnny-five"),
  board = new five.Board({port: "/dev/tty.usbserial-A9GF3L9D" });

board.on("ready", function() {
  var piezo = new five.Piezo(3);

  board.repl.inject({
    piezo: piezo
  });

  // twinkle twinkle little star
  //piezo.song("ccggaagffeeddcggffeedggffeedccggaagffeeddc", "222222422222242222224222222422222242222224");

  // Mary had a little lamb
  piezo.song("edcdeee ddd egg edcdeeeeddedc","22222222222222222222222222222");
});
