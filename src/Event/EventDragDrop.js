function eventDragDrop(game){

    // drag on
    game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        game.input.off('pointerover');
    });

    game.input.on('dragenter', function (pointer, gameObject, dropZone) {
        textHandler.infoText.setText(("Use " + gameObject.name + " with " + dropZone.name));
        textHandler.fitFont(textHandler.infoText, textHandler.infoZone);
        Phaser.Display.Align.In.Center(textHandler.infoText, textHandler.infoZone);
    });

    game.input.on('dragleave', function (pointer, gameObject, dropZone) {
        textHandler.infoText.setText(gameObject.name);
        textHandler.fitFont(textHandler.infoText, textHandler.infoZone);
        Phaser.Display.Align.In.Center(textHandler.infoText, textHandler.infoZone);
    });

    game.input.on('drop', function (pointer, gameObject, dropZone) {
        switch(gameObject.name + '_' + dropZone.name){
            case 'Take_Beer':
                world.scenario.beer.destroy();
                world.zone.beer.destroy();
                world.player.inventory.push("Beer");
                dialogHandler.talk(game, dropZone, 'Take_Beer');
                break;
            default:
                dialogHandler.talk(game, dropZone, 'no');
        }
    });

    // drag end
    game.input.on('dragend', function (pointer, gameObject) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            // restart event listner on pointOver
            eventPointOver(game);
    });
};
