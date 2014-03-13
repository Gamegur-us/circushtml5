/* global GameCtrl */

GameCtrl.GameLevel1 = function () {

        //        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
/*
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
*/
    //        You can use any of these from any function within this State.
    //        But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

GameCtrl.GameLevel1.prototype = {
    
    /**
     * Draw the distance
     */
    _createMeters:function(){
        for(var i=10;i>=0;i--){
            this.add.text((10-i)*780, 680, (i*10)+' m', {
                font : '50px "arcadeclasic"',
                fill : '#fff',
                align : 'center'
            });
        }
    },
    /**
     * Create player group (the clown and the lion)
     */
    _createPlayer:function(){
        
        
        this.lion=this.add.sprite(85, 630, 'clown','lion0000');
        this.lion.body.setPolygon(0,0, 0,16, 28,16,  28,0, 18,0, 18,-20, 15,-23,  10,-23 , 10,0 );
        this.clown=this.game.add.sprite(6, -22, 'clown','clownStand0000');
        this.lion.addChild(this.clown);
        this.lion.scale.x =3;
        this.lion.scale.y =3;
        
        this.lion.body.gravity.y=700;

        this.lion.animations.add('runLion', Phaser.Animation.generateFrameNames('lion', 0, 2, '', 4), 3 /*fps */, true);
        this.lion.animations.add('idleLion', Phaser.Animation.generateFrameNames('lion', 0, 0, '', 4), 1 /*fps */, true);
        

        this.clown.isRunning=false;


        this.lion.body.collideWorldBounds=true;
        

    },

    /**
     * Create the static obstacles (firepots)
     */
    _createObstacles:function(){
        this.obstacles=this.add.group();
        var w=this.world.bounds.width-800;
        for (var i = 1200; i < w; i+=800){
            var firepot=this.add.sprite(i, 585, 'clown','firepot0000');
            firepot.body.setPolygon( 10,0,14,0,20,30, 5,30 );
            firepot.body.x=i;
            firepot.body.y=585;

            this.obstacles.add(firepot);
            
        }

        this.obstacles.setAll('scale.x',3);
        this.obstacles.setAll('scale.y',3);
        this.obstacles.callAll('animations.add', 'animations', 'burnPot', Phaser.Animation.generateFrameNames('firepot', 0, 1, '', 4), 10, true);
        this.obstacles.callAll('animations.play', 'animations', 'burnPot');
    },
    _createFireCirclesLeft:function(){
        var burnCircleLeft=Phaser.Animation.generateFrameNames('firecirclel', 0, 1, '', 4);
        this.firecirclesLeft=this.add.group();
        for (var i = 800; i < this.world.bounds.width; i+=800){
            if(i%2){
                i-=300 + Math.floor(Math.random() * 100) + 1;
            }
            i++;

                        
            var fireCircleLeft=this.add.sprite(i, 335, 'clown','firecirclel0000');
            fireCircleLeft.animations.add('burnCircleLeft', burnCircleLeft, 5, true);

            this.firecirclesLeft.add(fireCircleLeft);
        }

        this.firecirclesLeft.setAll('scale.x',3);
        this.firecirclesLeft.setAll('scale.y',3);
        this.firecirclesLeft.setAll('body.velocity.x',-70);

        this.firecirclesLeft.callAll('animations.play', 'animations', 'burnCircleLeft');

    },
    _createFireCirclesRight:function(){
        var burnCircleRigth=Phaser.Animation.generateFrameNames('firecircler', 0, 1, '', 4);
        this.firecirclesRight=this.add.group();
        var l=this.firecirclesLeft._container.children.length;
        for(var i=0;i<l;i++){
            var x =this.firecirclesLeft._container.children[i].body.x+30;
            var fireCircleRight=this.add.sprite(x, 335, 'clown','firecircler0000');
            fireCircleRight.animations.add('burnCircleRigth', burnCircleRigth, 5, true);
            
            this.firecirclesRight.add(fireCircleRight);
      
            
        }
        this.firecirclesRight.setAll('scale.x',3);
        this.firecirclesRight.setAll('scale.y',3);
        this.firecirclesRight.setAll('body.velocity.x',-70);
        
        this.firecirclesRight.callAll('animations.play', 'animations', 'burnCircleRigth');

    },
    _createFireCirclesCollision:function(){
        this.fireCollisionGroup=this.add.group();
        var l=this.firecirclesLeft._container.children.length;
        for(var i=0;i<l;i++){
            var x =this.firecirclesLeft._container.children[i].body.x+30;
        
            var touchFire = this.game.add.sprite(x-14, 550);
            touchFire.body.setCircle(11);
            this.fireCollisionGroup.add(touchFire);

        }
        this.fireCollisionGroup.setAll('body.velocity.x',-70);
    },
    create: function () {
            this.gameover=false;

            this.cursors =this.game.input.keyboard.createCursorKeys();
            //this.game.world.setBounds(0,0,4000, 2000);
            this.world.setBounds(0,0,1024 * 8, 200);
            //this.background=this.game.add.tileSprite(0, 200, 1024, 552, 'background');
            this.background=this.add.tileSprite(0, 200, 1024 * 8, 552, 'background');



            this._createMeters();
            this._createFireCirclesLeft();
            this._createPlayer();
            this._createFireCirclesRight();
            this._createObstacles();
            this._createFireCirclesCollision();


            this.endStage=this.game.add.sprite(605, 620, 'clown','endLevel1');
            this.endStage.scale.x=3;
            this.endStage.scale.y=3;
            this.endStage.body.immovable = true;
            this.endStage.body.checkCollision.left = false;
            this.endStage.body.checkCollision.right = false;
            this.endStage.body.collideWorldBounds = true;

            this.floor = this.game.add.sprite(0, 678);
            this.floor.body.immovable = true;
            this.floor.body.collideWorldBounds = true;
            this.floor.scale.x = this.game.world.width;
            
            
            // On out of world:
            //      circle.reset(1024*8,335);
            //      circle.body.velocity.x=-70;
  
  /*          this.wall= this.add.sprite(0, 800, 'clown','');
            this.wall.body.width=20;
            this.wall.body.height=800;
            this.wall.height=800;
            this.wall.width=20;*/
            //debugger;
            

            /*this.firecircles.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds',function(circle){
                console.log(circle.body.x);
                if(circle.body.x<0){
                    circle.reset(1024*8,335);
                    circle.body.velocity.x=-70;
                }
                
            });*/

  //          this.firecircles.callAll('animations.play', 'animations', 'burnCircle');

            
   
            
            
    
    },

    update: function () {
        if(this.gameover){
            this.clown.frameName='clownburn0000';
            this.lion.frameName='lionburn0000';
            this.lion.body.gravity.y=0;
            this.lion.body.velocity.y=0;
            this.lion.body.velocity.x=0;
            return;
        }
        this.lion.body.gravity.y=200;

        this.physics.collide(this.endStage, this.lion);
        this.physics.collide(this.floor, this.lion);

            
        this.physics.overlap(this.fireCollisionGroup, this.lion, function(){
            this.gameover=true;
        }, null, this);

        this.physics.overlap(this.obstacles, this.lion, function(){
            this.gameover=true;            
        }, null, this);



        var isJumping=!this.lion.body.touching.down;

        this.game.camera.x=this.lion.x-100;
        if(isJumping){
            if(this.lion.y<580){
                this.lion.body.gravity.y=900;
            }
            this.clown.frameName='clownStandJump0000';
            this.lion.frameName='lion0002';

        }else{
            this.clown.frameName='clownStand0000';
        }

        if (this.cursors.up.isDown&& !isJumping){
            this.lion.body.velocity.y=-480;
            console.log('jump');
        }
        

        if(isJumping){
            // Mantengo la velocidad del fondo

            return;
        }

        if (this.cursors.right.isDown){
            this.clown.isRunning=true;
            //this.background.tilePosition.x -= 4;
            
            this.lion.body.velocity.x=200;
            this.lion.animations.play('runLion', 10, true);
        }else if (this.cursors.left.isDown){
            this.clown.isRunning=true;
            //this.background.tilePosition.x -= 4;
            
            this.lion.body.velocity.x=-100;
            this.lion.animations.play('runLion', 6, true);
        }else{
            this.lion.body.velocity.x=0;
                
            this.clown.isRunning=false;
            this.lion.animations.stop(0);
            this.lion.animations.play('idleLion');
        }


    },
    render: function(){
        this.game.debug.renderPhysicsBody(this.lion.body);
        this.game.debug.renderPhysicsBody(this.floor.body);
        this.fireCollisionGroup.forEach(function (e) {
            this.game.debug.renderPhysicsBody(e.body);
        }, this);
        
        /*this.game.debug.renderPhysicsBody(this.endStage.body);
        this.game.debug.renderPhysicsBody(this.floor.body);
        
        this.obstacles.forEach(function (e) {
                this.game.debug.renderPhysicsBody(e.body);
        }, this);*/
    },
    quitGame: function () {

            //        Here you should destroy anything you no longer need.
            //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

            //        Then let's go back to the main menu.
            this.game.state.start('MainMenu');

    }

};