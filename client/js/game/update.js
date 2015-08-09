function update() {

    game.physics.arcade.collide(ape, layer1);

    moveControl();

}

function moveControl() {
    ape.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (ape.body.onFloor()) {
            ape.body.velocity.y = -jumpPower;
        } else{
            game.physics.arcade.gravity.y = gravity - gravityDecrease;
        }
    }
    else {
        game.physics.arcade.gravity.y = gravity;
    }
    if (cursors.down.isDown && !ape.body.onFloor()) {
        game.physics.arcade.gravity.y = gravity + gravityDecrease;
    }

    if (cursors.left.isDown) {
        ape.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        ape.body.velocity.x = 150;
    }
}