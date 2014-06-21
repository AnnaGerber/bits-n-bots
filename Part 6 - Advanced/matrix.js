var five = require("johnny-five"),
    board, shiftRegister;

board = new five.Board();

board.on("ready", function() {
  shiftRegister = new five.ShiftRegister({
    pins: {
      data: 2,
      clock: 3,
      latch: 4
    }
  });

  this.repl.inject({
    sr: shiftRegister
  });

function send2(value, value2) {
  board.digitalWrite(4, board.io.LOW);
  board.shiftOut(2, 3, true, (0xff - value));
  board.shiftOut(2, 3, true, value2);
  board.digitalWrite(4, board.io.HIGH);
};
shiftRegister.send2 = send2;

function test(){
  // clear matrix and then turn all LEDs on after half a second
  shiftRegister.send2(0,0);
  board.wait(500,function(){
    shiftRegister.send2(0xff,0xff);
  })
}
function flashyHeart (){
  // flash through rows in heart pattern
  var delay =  50;
  board.loop(7 * delay,function(){
    shiftRegister.send2(0x66,0x1);
    board.wait(delay * 1,function(){
      shiftRegister.send2(0xff,0x2);
    })
    board.wait(delay * 2,function(){
      shiftRegister.send2(0xff,0x4);
    })
    board.wait(delay * 3,function(){
      shiftRegister.send2(0xff,0x8);
    })
    board.wait(delay * 4,function(){
      shiftRegister.send2(0x7e,0x10);
    })
    board.wait(delay * 5,function(){
      shiftRegister.send2(0x3c,0x20);
    })
    board.wait(delay * 6,function(){
      shiftRegister.send2(0x18,0x40);
    })
  })
}
function flashyX(){
  board.loop(40, function(){
    shiftRegister.send2(0x81,0x81);
    board.wait(10,function(){
      shiftRegister.send2(0x42,0x42);
    })
    board.wait(20,function(){
      shiftRegister.send2(0x24,0x24);
    })
    board.wait(30,function(){
      shiftRegister.send2(0x18,0x18);
    })
  })
}
// uncomment one of the following
//test()
//flashyHeart();
//flashyX()
// or use the REPL to send patterns e.g. sr.send2(0xff,0xff)
});
