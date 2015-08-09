function update() {

    game.physics.arcade.collide(ape, layer);

    game.physics.arcade.collide(ape, diamond, jumpControlGet, null, this);

    moveControl();

    updateServer();

    getUpdatesFromServer();
}

function moveControl() {
    ape.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (ape.body.onFloor()) {
            ape.body.velocity.y = -jumpPower;
        } else {
            game.physics.arcade.gravity.y = gravity - gravityDecrease;
        }
    }
    else{
        game.physics.arcade.gravity.y = gravity;
    }
    if (cursors.down.isDown && !ape.body.onFloor()) {
        game.physics.arcade.gravity.y = gravity + gravityDecrease;
    }

    if (cursors.left.isDown) {
        ape.body.velocity.x = -350;
    } else if (cursors.right.isDown) {
        ape.body.velocity.x = 350;
    }
}
