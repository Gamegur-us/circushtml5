GameCtrl.Game = function (game) {

        //        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;                //        a reference to the currently running game
    this.add;                //        used to add sprites, text, groups, etc
    this.camera;        //        a reference to the game camera
    this.cache;                //        the game cache
    this.input;                //        the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;                //        for preloading assets
    this.math;                //        lots of useful common math operations
    this.sound;                //        the sound manager - add a sound, play one, set-up markers, etc
    this.stage;                //        the game stage
    this.time;                //        the clock
    this.tweens;        //        the tween manager
    this.world;                //        the game world
    this.particles;        //        the particle manager
    this.physics;        //        the physics manager
    this.rnd;                //        the repeatable random number generator

    //        You can use any of these from any function within this State.
    //        But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

GameCtrl.Game.prototype = {
    
    create: function () {
            this.cursors =this.game.input.keyboard.createCursorKeys();
            //this.game.world.setBounds(0,0,4000, 2000);
            this.game.world.setBounds(0,0,1024 * 8, 200);
            //this.background=this.game.add.tileSprite(0, 200, 1024, 552, 'background');
            this.background=this.game.add.tileSprite(0, 200, 1024 * 8, 552, 'background');


            
            this.lion= this.game.add.sprite(85, 625, 'clown','lion0000');
            this.lion.scale.x =3;
            this.lion.scale.y =3;
            this.lion.animations.add('runLion', Phaser.Animation.generateFrameNames('lion', 0, 2, '', 4), 3 /*fps */, true);
            this.lion.animations.add('idleLion', Phaser.Animation.generateFrameNames('lion', 0, 0, '', 4), 1 /*fps */, true);
            
            this.clown= this.game.add.sprite(100, 560, 'clown','clownStand0000');
            this.clown.scale.x =3;
            this.clown.scale.y =3;
            this.clown.isRunning=false;

            this.clown.body.collideWorldBounds=true;
            this.lion.body.collideWorldBounds=true;


            this.player=this.game.add.group();
            this.player.add(this.lion);
            this.player.add(this.clown);
            
            for(var i=10;i>=0;i--){
                this.game.add.text((10-i)*700, 680, (i*100)+' m', {
                  font : '50px "arcadeclasic"',
                  fill : '#fff',
                  align : 'center'
                });
            }

    },

    update: function () {
        if(this.clown.y < 560){
            
            this.clown.frameName='clownStandJump0000';
            this.lion.frameName='lion0002';            
        }else{
            this.clown.frameName='clownStand0000';
            this.clown.isJumping=false;
            this.clown.y = 560;
            this.lion.y = 625;
            this.player.setAll('body.velocity.y',0);
        }

        if (this.cursors.up.isDown&& !this.clown.isJumping){
            this.player.setAll('body.velocity.y',-500);
            this.player.setAll('body.gravity.y',700);
            
         
            this.clown.isJumping=true;
        }
        

        if(this.clown.isJumping){
            // Mantengo la velocidad del fondo
            if(this.clown.isRunning){
                this.game.camera.x += 4;
                this.player.setAll('body.velocity.x',250);
            }

            return;
        }

        if (this.cursors.right.isDown){
            this.clown.isRunning=true;
            //this.background.tilePosition.x -= 4;
            this.game.camera.x += 4;
            this.player.setAll('body.velocity.x',250);
            this.lion.animations.play('runLion', 10, true);
        }else{
            this.player.setAll('body.velocity.x',0);
                
            this.clown.isRunning=false;
            this.lion.animations.stop(0);
            this.lion.animations.play('idleLion');
        }



    },

    quitGame: function (pointer) {

            //        Here you should destroy anything you no longer need.
            //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

            //        Then let's go back to the main menu.
            this.game.state.start('MainMenu');

    }

};