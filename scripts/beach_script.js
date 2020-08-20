var canvas;
var ctx;
var state = 0;
var keyPressed = [];
var x;
var y;
var coins = 0;
var walk_speed = 10;
var walk_sound;
var ocean_music;
var coin_sound;
var value = 10;
var martin = {
  sourceX: 0,
  sourceY: 128,
  sizeX: 64,
  sizeY: 64,
  posX: 50,
  posY: 50,
  disWidth: 100,
  disHeight: 100,
  offset: 50
};
var waterbottle = {
  sourceX: 0,
  sourceY: 0,
  sizeX: 100,
  sizeY: 100,
  posX: Math.floor((Math.random() * 630) + 30),
  posY: Math.floor((Math.random() * 270) + 100),
  disWidth: 80,
  disHeight: 80,
  see: true
};
var box = {
  sourceX: 0,
  sourceY: 0,
  sizeX: 100,
  sizeY: 100,
  posX: Math.floor((Math.random() * 630) + 30),
  posY: Math.floor((Math.random() * 270) + 100),
  disWidth: 80,
  disHeight: 80,
  see: true
};
var notebookpaper = {
  sourceX: 0,
  sourceY: 0,
  sizeX: 100,
  sizeY: 100,
  posX: Math.floor((Math.random() * 630) + 30),
  posY: Math.floor((Math.random() * 270) + 100),
  disWidth: 80,
  disHeight: 80,
  see: true
};
var bag = {
  sourceX: 0,
  sourceY: 0,
  sizeX: 100,
  sizeY: 100,
  posX: Math.floor((Math.random() * 630) + 30),
  posY: Math.floor((Math.random() * 270) + 100),
  disWidth: 80,
  disHeight: 80,
  see: true
};
var trash = [waterbottle, box, notebookpaper, bag];

// onLoad function, initializes
function init() {
  ocean_music = document.getElementById('ocean');
  ocean_music.loop = true;

  walk_sound = document.getElementById("walk");
  walk_sound.loop = true;

  coin_sound = document.getElementById('coin');

  player = document.getElementById('martin');

  canvas = document.getElementById('beachCanvas');
  canvas.addEventListener('mousedown', update_state, false);
  ctx = canvas.getContext('2d');

  window.setInterval(update,50);
  requestAnimationFrame(drawBackground);
  requestAnimationFrame(drawState);

  window.onkeydown = keydown;
  window.onkeyup = keyup;
}

// changes the game state based on user clicks
function update_state(evt) {
  var rect = canvas.getBoundingClientRect();
  x = evt.clientX - rect.left;
  y = evt.clientY - rect.top;
  if ((state == 0) && (x >= 306) && (x <= 494) && (y >= 377) && (y <= 433)) {
    state = 1;
  }
  else if ((state == 1) && (x >= 689) && (x <= 789) && (y >= 455) && (y <= 492)) {
    state = 2;
  }
  else if ((state == 2)) {
    // bad items
    if ((x >= 50) && (x <= 190) && (y >= 113) && (y <= 252)) {
      if (coins >= 20) {
        coins -= 20;
        value -= 2;
        alert("oh no! this item is bad for the environment. you will get 2 fewer coins for every piece of trash you pick up.");
      } else alert("not enough money!");
    }
    else if ((x >= 236) && (x <= 374) && (y >= 113) && (y <= 252)) {
      if (coins >= 15) {
        coins -= 15;
        value -= 2;
        alert("oh no! this item is bad for the environment. you will get 2 fewer coins for every piece of trash you pick up.");
      } else alert("not enough money!");
    }
    else if ((x >= 420) && (x <= 557) && (y >= 113) && (y <= 252)) {
      if (coins >= 20) {
        coins -= 20;
        value -= 2;
        alert("oh no! this item is bad for the environment. you will get 2 fewer coins for every piece of trash you pick up.");
      } else alert("not enough money!");
    }
    else if ((x >= 604) && (x <= 741) && (y >= 113) && (y <= 252)) {
      if (coins >= 10) {
        coins -= 10;
        value -= 2;
        alert("oh no! this item is bad for the environment. you will get 2 fewer coins for every piece of trash you pick up.");
      } else alert("not enough money!");
    }
    // good items
    else if ((x >= 50) && (x <= 190) && (y >= 297) && (y <= 436)) {
      if (coins >= 100) {
        coins -= 100;
        alert("you bought a reusable waterbottle!")
      } else alert("not enough money!");
    }
    else if ((x >= 236) && (x <= 374) && (y >= 297) && (y <= 436)) {
      if (coins >= 30) {
        coins -= 30;
        alert("you bought a metal straw!")
      } else alert("not enough money!");
    }
    else if ((x >= 420) && (x <= 557) && (y >= 297) && (y <= 436)) {
      if (coins >= 50) {
        coins -= 50;
        alert("you bought a reusable bag!")
      } else alert("not enough money!");
    }
    else if ((x >= 604) && (x <= 741) && (y >= 297) && (y <= 436)) {
      if (coins >= 80) {
        coins -= 80;
        alert("you bought a ceramic plate!")
      } else alert("not enough money!");
    }
    else if ((x >= 678) && (x <= 772) && (y >= 29) && (y <= 54)) {
      state = 1;
    }
  }
}

// game update function
function update() {
  if ((keyPressed['Right']) || (keyPressed['ArrowRight'])) {
    martin.sourceY = 128;
    martin.sourceX = (martin.sourceX + 1) % 4;
    if (martin.posX < 725) {
      martin.posX = martin.posX + walk_speed;
      martin.sourceY = 128;
    }
  }
  else if ((keyPressed['Left']) || (keyPressed['ArrowLeft'])) {
    martin.sourceY = 64;
    martin.sourceX = (martin.sourceX + 1) % 4;
    if (martin.posX > -25) {
      martin.posX = martin.posX - walk_speed;
      martin.sourceY = 64;
    }
  }
  else if ((keyPressed['Up']) || (keyPressed['ArrowUp'])){
    martin.sourceX = (martin.sourceX + 1) % 4;
    martin.sourceY = 192;
    if (martin.posY >= 0) {
      martin.posY = martin.posY - walk_speed;
    }
  }
  else if ((keyPressed['Down']) || (keyPressed['ArrowDown'])) {
    martin.sourceX = (martin.sourceX + 1) % 4;
    martin.sourceY = 0;
    if (martin.posY < 403) {
      martin.posY = martin.posY + walk_speed;
    }
  }
  if (coins >= 400) {
    bag.see = false;
  }
  else if (coins >= 300) {
    notebookpaper.see = false;
  }
  else if (coins >= 200) {
    box.see = false;
  }
  else if (coins >= 100) {
    waterbottle.see = false;
  }
  if (bag.see == false && notebookpaper.see == false &&
    box.see == false && waterbottle.see == false) {
    state = 2;
  }
}

function keydown(e) {
  keyPressed[e.key] = true;
  if (e['Right'] || keyPressed['ArrowRight']
    || keyPressed['Left'] || keyPressed['ArrowLeft']
    || keyPressed['Up'] || keyPressed['ArrowUp']
    || keyPressed['Down']|| keyPressed['ArrowDown']) {
        walk_sound.play();
    }
}

function keyup(e) {
  keyPressed[e.key] = false;
  i = 0;
  walk_sound.pause();
}

// draws the background
function drawBackground() {
  if (state == 0) {
    var start_menu = document.getElementById('menu');
    ctx.drawImage(start_menu, 0, 0);
  }
  else if (state == 1) {
    var beach = document.getElementById('beach');
    ctx.drawImage(beach, 0, 0);
  }
  else if (state == 2) {
    var shop = document.getElementById('shop');
    ctx.drawImage(shop, 0, 0);
  }
  requestAnimationFrame(drawBackground);
}

// draws the state
function drawState() {
  if (state == 1) {
    // draws character
    ctx.drawImage(player, martin.sourceX * 64, martin.sourceY, martin.sizeX, martin.sizeY,
      martin.posX, martin.posY, martin.disWidth, martin.disHeight);
    // draws coins
    ctx.font = "25px Courier New";
    ctx.fillStyle = "#FFCC33";
    ctx.fillText(coins, 103, 29);
    // draws trash
    if (waterbottle.see == true) {
      ctx.drawImage(bottle, waterbottle.sourceX, waterbottle.sourceY, waterbottle.sizeX,
        waterbottle.sizeY, waterbottle.posX, waterbottle.posY, waterbottle.disWidth,
        waterbottle.disHeight);
    }
    if (box.see == true) {
      ctx.drawImage(pizza, box.sourceX, box.sourceY, box.sizeX, box.sizeY, box.posX, box.posY,
        box.disWidth, box.disHeight);
    }
    if (notebookpaper.see== true) {
      ctx.drawImage(paper, notebookpaper.sourceX, notebookpaper.sourceY, notebookpaper.sizeX,
        notebookpaper.sizeY, notebookpaper.posX, notebookpaper.posY, notebookpaper.disWidth,
        notebookpaper.disHeight);
    }
    if (bag.see == true) {
      ctx.drawImage(plastic, bag.sourceX, bag.sourceY, bag.sizeX, bag.sizeY, bag.posX, bag.posY,
        bag.disWidth, bag.disHeight);
    }
    checkCollision();
  }
  else if (state == 2) {
    //draws coins
    ctx.font = "25px Courier New";
    ctx.fillStyle = "#663300";
    ctx.fillText(coins, 120, 47);
    trash.forEach(changeSee);
    function changeSee(item, index) {
      item.see = true;
    }
  }
  requestAnimationFrame(drawState);
}

// checks if the character touched any of the trash
function checkCollision() {
  if (martin.posX + (martin.disWidth - martin.offset) >= waterbottle.posX &&
    martin.posX + martin.offset <= (waterbottle.posX + waterbottle.disWidth)) {
    if ((martin.posY + martin.disHeight) >= waterbottle.posY &&
      martin.posY <= waterbottle.posY + waterbottle.disHeight) {
      if (waterbottle.see == true) {
        coins += value;
        waterbottle.posX = Math.floor((Math.random() * 630) + 30);
        waterbottle.posY = Math.floor((Math.random() * 270) + 100);
        coin_sound.load();
        coin_sound.play();
      }
    }
  }
  if (martin.posX + (martin.disWidth - martin.offset) >= box.posX &&
    martin.posX + martin.offset <= (box.posX + box.disWidth)) {
    if ((martin.posY + martin.disHeight) >= box.posY && martin.posY <= box.posY + box.disHeight) {
      if (box.see == true) {
          coins += value;
          box.posX = Math.floor((Math.random() * 630) + 30);
          box.posY = Math.floor((Math.random() * 270) + 100);
          coin_sound.load();
          coin_sound.play();
      }
    }
  }
  if (martin.posX + (martin.disWidth - martin.offset) >= notebookpaper.posX &&
    martin.posX + martin.offset <= (notebookpaper.posX + notebookpaper.disWidth)) {
    if ((martin.posY + martin.disHeight) >= notebookpaper.posY &&
      martin.posY <= notebookpaper.posY + notebookpaper.disHeight) {
      if (notebookpaper.see == true) {
          coins += value;
          notebookpaper.posX = Math.floor((Math.random() * 630) + 30);
          notebookpaper.posY = Math.floor((Math.random() * 270) + 100);
          coin_sound.load();
          coin_sound.play();
      }
    }
  }
  if (martin.posX + (martin.disWidth - martin.offset) >= bag.posX &&
    martin.posX + martin.offset <= (bag.posX + bag.disWidth)) {
    if ((martin.posY + martin.disHeight) >= bag.posY && martin.posY <= bag.posY + bag.disHeight) {
      if (bag.see == true) {
          coins += value;
          bag.posX = Math.floor((Math.random() * 630) + 30);
          bag.posY = Math.floor((Math.random() * 270) + 100);
          coin_sound.load();
          coin_sound.play();
      }
    }
  }
}

function start_music() {
  ocean_music.play();
}

function pause_music() {
  ocean_music.pause();
}

window.onload = init;
