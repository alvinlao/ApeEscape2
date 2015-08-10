function End(game) {
    State.call(this, game);
}

End.prototype = Object.create(State.prototype);
End.constructor = End;
