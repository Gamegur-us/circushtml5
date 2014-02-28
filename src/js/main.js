(function () {
  //        Create your Phaser game and inject it into the game div.
  //        We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
  //        We're using a game size of 1024 x 768 here, but you can use whatever you feel makes sense for your game of course.
  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');

  //        Add the States your game has.
  //        You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
  game.state.add('Boot', GameCtrl.Boot);
  game.state.add('Preloader', GameCtrl.Preloader);
  game.state.add('MainMenu', GameCtrl.MainMenu);
  game.state.add('Game', GameCtrl.Game);

  //        Now start the Boot state.
  game.state.start('Boot');
}());