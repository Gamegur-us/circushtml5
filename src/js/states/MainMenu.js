/* global GameCtrl */
'use strict';
GameCtrl.MainMenu = function (/*game*/) {

        this.music = null;
        this.playButton = null;

};

GameCtrl.MainMenu.prototype = {


        preload: function(){
            var botData=
{'frames': [
    {
    'filename': 'clown0000',
    'frame': {'x':164,'y':5,'w':16,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {
    'filename': 'clown0001',
    'frame': {'x':185,'y':5,'w':16,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {
    'filename': 'clown0002',
    'frame': {'x':205,'y':5,'w':16,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {
    'filename': 'clownJump0003',
    'frame': {'x':226,'y':5,'w':16,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {
    'filename': 'clownStand0000',
    'frame': {'x':164,'y':58,'w':15,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':15,'h':24}
    },
    {
    'filename': 'clownStandJump0000',
    'frame': {'x':182,'y':58,'w':15,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':15,'h':24}
    },
    {
    'filename': 'lion0002',
    'frame': {'x':164,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },
    {
    'filename': 'lion0001',
    'frame': {'x':200,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },
    {
    'filename': 'lion0000',
    'frame': {'x':234,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },    
    {
    'filename': 'firepot0000',
    'frame': {'x':221,'y':194,'w':24,'h':31},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':24,'h':31},
    'sourceSize': {'w':24,'h':31}
    },    
    {
    'filename': 'firepot0001',
    'frame': {'x':195,'y':194,'w':24,'h':31},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':24,'h':31},
    'sourceSize': {'w':24,'h':31}    
    },
    {
    'filename': 'firecirclel0000',
    'frame': {'x':136,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    
    },
    {
    'filename': 'firecirclel0001',
    'frame': {'x':165,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    },
    {
    'filename': 'firecircler0000',
    'frame': {'x':148,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    },
    {
    'filename': 'firecircler0001',
    'frame': {'x':177,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    },
    {'filename': 'endLevel1',
    'frame': {'x':129,'y':243,'w':37,'h':22},
    'rotated': false,
    'trimmed': true,
    // con esto modifico el cuadrado para las colisiones
    'spriteSourceSize': {'x':0,'y':-4,'w':37,'h':22},
    'sourceSize': {'w':37,'h':18}
    }
    

    

    
    ]};


            this.game.load.atlas('clown', 'assets/images/CircusCharlieSheet1.gif', null, botData);

        },

        create: function () {

                //        We've already preloaded our assets, so let's kick right into the Main Menu itself.
                //        Here all we're doing is playing some music and adding a picture and button
                //        Naturally I expect you to do something significantly better :)

                this.music = this.add.audio('titleMusic');
                //this.music.play();

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
             
                var clown= this.game.add.sprite(100, 600, 'clown');
                clown.scale.x =4;
                clown.scale.y =4;
                clown.body.velocity.x =100;

                

                clown.animations.add('run', Phaser.Animation.generateFrameNames('clown', 0, 2, '', 4), 10 /*fps */, true);
                clown.animations.play('run', 8, true);
    //clown.animations.stope()


                this.enterPressed=false;
        },
        update: function () {
            // TODO remover esto!
          //  this.startGame();

                if(!this.enterPressed && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
                        this.enterPressed=true;
                        var _this=this;
                        this.blinkedTimes=-1;
                        this.timerBlinker=setInterval(function(){
                                _this.blinkedTimes++;
                                if(_this.blinkedTimes>10){
                                        clearInterval(_this.timerBlinker);
                                        _this.startGame();
                                }
                                _this.startText.visible = !_this.startText.visible;
                        },30);

                }
                //        Do some nice funky main menu effect here

        },

        startGame: function ( /* pointer */) {

                //        Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
                this.music.stop();

                //        And start the actual game
                this.game.state.start('GameLevel1');

        }

};