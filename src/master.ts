const gamescreen = new PIXI.Application(400, 300, {
    "backgroundColor": 0x444444,
    "resolution": 1,
});
gamescreen.view.id = "gamecanvas";
document.getElementById("holderdiv").appendChild(gamescreen.view);

const test_sprite = PIXI.Sprite.fromImage('images/test.gif');

test_sprite.anchor.set(0.5);
test_sprite.x = 200;
test_sprite.y = 150;

gamescreen.stage.addChild(test_sprite);

