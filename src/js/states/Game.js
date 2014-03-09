'use strict';
GameCtrl.GameLevel1 = function (game) {

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

GameCtrl.GameLevel1.prototype = {
    
    create: function () {
            this.cursors =this.game.input.keyboard.createCursorKeys();
            //this.game.world.setBounds(0,0,4000, 2000);
            this.world.setBounds(0,0,1024 * 8, 200);
            //this.background=this.game.add.tileSprite(0, 200, 1024, 552, 'background');
            this.background=this.add.tileSprite(0, 200, 1024 * 8, 552, 'background');


            
            this.lion= this.add.sprite(85, 630, 'clown','lion0000');
            this.lion.scale.x =3;
            this.lion.scale.y =3;
            this.lion.animations.add('runLion', Phaser.Animation.generateFrameNames('lion', 0, 2, '', 4), 3 /*fps */, true);
            this.lion.animations.add('idleLion', Phaser.Animation.generateFrameNames('lion', 0, 0, '', 4), 1 /*fps */, true);
            
            this.clown= this.game.add.sprite(105, 565, 'clown','clownStand0000');
            this.clown.scale.x =3;
            this.clown.scale.y =3;
            this.clown.isRunning=false;

            this.clown.body.collideWorldBounds=true;
            this.lion.body.collideWorldBounds=true;


            this.player=this.game.add.group();
            this.player.add(this.lion);
            this.player.add(this.clown);
            
            for(var i=10;i>=0;i--){
                this.add.text((10-i)*780, 680, (i*10)+' m', {
                  font : '50px "arcadeclasic"',
                  fill : '#fff',
                  align : 'center'
                });
            }

            this.obstacles=this.add.group();
            for (i = 1200; i < 1024 * 8-800; i+=800){
                this.obstacles.add(this.add.sprite(i, 585, 'clown','firepot0000'));
            }

            this.firecircles=this.add.group();
            for (i = 800; i < 1024 * 8; i+=800){
                if(i%2){
                    i-=300 + Math.floor(Math.random() * 100) + 1
                }
                i++;

                            
                var fireCircle=this.add.sprite(i, 335, 'clown','firecircle0000');
                     fireCircle.body.collideWorldBounds=true;

                fireCircle.events.onOutOfBounds.add(function(circle){
                    console.log(circle.body.x);
                if(circle.body.x<0){
                    circle.reset(1024*8,335);
                    circle.body.velocity.x=-70;
                }
                }  , this);
                this.firecircles.add(fireCircle);
            }

            this.wall= this.add.sprite(0, 800, 'clown','');
            this.wall.body.width=20;
            this.wall.body.height=800;
            this.wall.height=800;
            this.wall.width=20;
            //debugger;
            

            //sprite1.body.setRectangle(100, 50, 50, 25);
            //sprite1.body.immovable = true;

            /*this.firecircles.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds',function(circle){
                console.log(circle.body.x);
                if(circle.body.x<0){
                    circle.reset(1024*8,335);
                    circle.body.velocity.x=-70;
                }
                
            });*/

            this.firecircles.callAll('animations.add', 'animations', 'burnCircle', Phaser.Animation.generateFrameNames('firecircle', 0, 1, '', 4), 5, true);
            this.firecircles.callAll('animations.play', 'animations', 'burnCircle');

            this.firecircles.setAll('scale.x',3);
            this.firecircles.setAll('scale.y',3);
            this.firecircles.setAll('body.velocity.x',-70);
            

            this.obstacles.setAll('scale.x',3);
            this.obstacles.setAll('scale.y',3);
            this.obstacles.callAll('animations.add', 'animations', 'burnPot', Phaser.Animation.generateFrameNames('firepot', 0, 1, '', 4), 10, true);
            this.obstacles.callAll('animations.play', 'animations', 'burnPot');



    
    },

    update: function () {

        this.game.physics.overlap(this.obstacles, this.player, function(){
            console.log('game over');
            
        }, null, this);

        this.game.camera.x=this.clown.x-100;
        if(this.clown.y < 565){
            
            this.clown.frameName='clownStandJump0000';
            this.lion.frameName='lion0002';
        }else{
            this.clown.frameName='clownStand0000';
            this.clown.isJumping=false;
            this.clown.y = 565;
            this.lion.y = 630;
            this.player.setAll('body.velocity.y',0);
        }

        if (this.cursors.up.isDown&& !this.clown.isJumping){
            this.player.setAll('body.velocity.y',-480);
            this.player.setAll('body.gravity.y',700);
            
         
            this.clown.isJumping=true;
        }
        

        if(this.clown.isJumping){
            // Mantengo la velocidad del fondo
            if(this.clown.isRunning){
                //this.player.setAll('body.velocity.x',200);
            }

            return;
        }

        if (this.cursors.right.isDown){
            this.clown.isRunning=true;
            //this.background.tilePosition.x -= 4;
            
            this.player.setAll('body.velocity.x',200);
            this.lion.animations.play('runLion', 10, true);
        }else if (this.cursors.left.isDown){
            this.clown.isRunning=true;
            //this.background.tilePosition.x -= 4;
            
            this.player.setAll('body.velocity.x',-100);
            this.lion.animations.play('runLion', 6, true);
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