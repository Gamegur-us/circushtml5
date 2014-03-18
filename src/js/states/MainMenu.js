(function(){
'use strict';

/* global GameCtrl */
GameCtrl.MainMenu = function (/*game*/) {
    this.music = null;
    this.playButton = null;
};

GameCtrl.MainMenu.prototype = {


        preload: function(){
            
        },

        create: function () {
                this.backgroundColor = '#000';
                
        
                var starsmenu=this.game.add.sprite(130, 100, 'starsmenu');
                starsmenu.scale.x =5;
                starsmenu.scale.y =5;

                var logo=this.game.add.sprite(250, 170, 'logo');
                logo.scale.x=0.8;
                logo.scale.y=0.8;
                

                //this.playButton = this.add.button(this.game.width / 2 - 160, this.game.height / 2 - 120, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');


                var textstyle = {
                  font : '50px "arcadeclasic"',
                  fill : '#fff',
                  align : 'center'
                };
                //var textobj = 
                this.startText=this.game.add.text(this.game.width / 2 - 180, this.game.height / 2 + 120, 'Press  ENTER  to\n start playing', textstyle);


                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                     
                var clown= this.game.add.sprite(100, 600, 'clown');
                clown.scale.x =4;
                clown.scale.y =4;
                this.game.physics.enable(clown, Phaser.Physics.ARCADE);

                clown.body.velocity.x =100;

                

                clown.animations.add('run', Phaser.Animation.generateFrameNames('clown', 0, 2, '', 4), 10 /*fps */, true);
                clown.animations.play('run', 8, true);
    //clown.animations.stope()


                this.enterPressed=false;
        },
        update: function () {
            // TODO remover esto!
            //    this.startGame();

                if(!this.enterPressed && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
                        this.enterPressed=true;
                        var _this=this;
                        this.blinkedTimes=-1;
                        this.timerBlinker=setInterval(function(){
                                _this.blinkedTimes++;
                                if(_this.blinkedTimes>10){
                                        clearInterval(_this.timerBlinker);
                                        _this.game.state.start('GameLevel1');
                                }
                                _this.startText.visible = !_this.startText.visible;
                        },30);

                }
                //        Do some nice funky main menu effect here

        },

};

})();