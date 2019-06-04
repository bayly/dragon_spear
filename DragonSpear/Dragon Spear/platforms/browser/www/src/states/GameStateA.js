import Platform from '../prefabs/Platform';

class GameStateA extends Phaser.State {
		
	init() {
		// // pool of floors
		// this.floorPool = this.add.group();
		// // pool of platform
		// this.platformPool = this.add.group();
		// // pool of coins
		// this.coinsPool = this.add.group();
		// this.coinsPool.enableBody = true;
		//gravity
		this.game.physics.arcade.gravity.y = 500;
		//max jump distance
		this.maxJumpDistance =120;
		//min and max rotation of player
		this.minRotationPlayer = -30;
		this.maxRotationPlayer = 30;
		//enable cursor keys
		this.cursors = this.game.input.keyboard.createCursorKeys();
		// //coins
		// this.myCoins = 0;
		//level speed
		this.levelSpeed = 200;

		this.gameOverCheck = false;
		// this.game.stage.smoothed = false;
	}

	// create
	create() {
		//sky background
		this.sky = this.add.tileSprite( 0, 0, this.game.world.width, 168, 'spriteSheet', 'Sky');
		// this.background.tileScale.y =1;
		this.sky.tileScale.y =1.5;
		this.sky.tileScale.x =1.5;
		this.game.world.sendToBack(this.sky);
		
		//moving background
		// 144 x 56
		this.background = this.add.tileSprite( 0, 140, this.game.world.width, 84, 'spriteSheet', 'bacgkground');
		// this.background.tileScale.y =1;
		this.background.tileScale.y =1.5;
		this.background.tileScale.x =1.5;
		this.background.autoScroll(-this.levelSpeed/12, 0);
		
		//moving town background
		// 144 x 25
		this.town = this.add.tileSprite( 0, 185, this.game.world.width, 37, 'spriteSheet', 'Town');
		this.town.tileScale.y =1.5;
		this.town.tileScale.x =1.5;
		this.town.autoScroll(-this.levelSpeed/6, 0);
		// this.game.world.sendToBack(this.background);

		//moving middle background
		// 144 x 51
		this.meadow = this.add.tileSprite( 0, 205, this.game.world.width, 76, 'spriteSheet', 'medow');
		this.meadow.tileScale.y =1.5;
		this.meadow.tileScale.x =1.5;
		this.meadow.autoScroll(-this.levelSpeed/6, 0);
		// this.game.world.sendToBack(this.background);

		// Create an empty group
		this.pipes = this.game.add.group(); 

		//create player 
		this.player = this.add.sprite(50,50, 'spriteSheet', 'character/dragon01');
		this.player.anchor.setTo(0.5);
		// Move the anchor to the left and downward
		// this.player.anchor.setTo(-0.2, 0.5); 
		let playerAnimtionFrameArray = ['character/dragon01','character/dragon02','character/dragon01','character/dragon02'];
	    this.player.animations.add('running', playerAnimtionFrameArray, 7, true);
	    this.game.physics.arcade.enable(this.player);
	    this.player.body.collideWorldBounds = true;
		// change player bounding box
		this.player.body.setSize(30, 30, 9, 7)
		this.player.play('running');
		
		// //hard-code first platform
  //   	this.currentPlatform = new Platform(this.game, this.floorPool, 12, 0, 290, -this.levelSpeed, this.coinsPool);
  //   	this.platformPool.add(this.currentPlatform);

    	//create sounds
    	// this.coinSound = this.add.audio('coin');
    	this.jumpSound = this.add.audio('jump');

  //   	this.loadLevel();

  		this.score = 0;
		this.labelScore = this.game.add.text(this.game.world.width -50, 20, "0", { font: "30px Arial", fill: "#ffffff" });   

    	//moving water
		this.water = this.add.tileSprite(0, this.game.world.height-55, this.game.world.width, 75, 'spriteSheet', 'Water-2');
		this.water.autoScroll(-this.levelSpeed/2, 0);
		this.game.physics.arcade.enable(this.water);
		this.water.body.setSize(this.game.world.width, 58, 0, 15)
		this.water.body.allowGravity = false;

		//create slpash emitter
		this.game.stage.backgroundColor = 0x337799;

	    this.emitter = this.game.add.emitter(0, 0, 100);

	    this.emitter.makeParticles('spriteSheet', ['redGem', 'purpleGem'], 200, false, false);
	    // this.emitter.gravity = -375;
	    this.emitter.setAlpha(1, 0, 2500);
	    this.emitter.setYSpeed(-175, -275); 
	    this.emitter.setXSpeed(-45, 45); 
    	this.emitter.setScale(0.5, 0.1, 0.5, 0.1, 6000, Phaser.Easing.Quintic.Out);

    	//create blood emitter
	    this.bloodEmitter = this.game.add.emitter(0, 0, 100);

	    this.bloodEmitter.makeParticles('spriteSheet', ['redGem', 'purpleGem'], 200, false, false);
	    // this.emitter.gravity = -375;
	    this.bloodEmitter.setAlpha(1, 0, 2500);
	    this.bloodEmitter.setYSpeed(-175, -275); 
	    this.bloodEmitter.setXSpeed(-45, 45); 
    	this.bloodEmitter.setScale(0.5, 0.1, 0.5, 0.1, 6000, Phaser.Easing.Quintic.Out);

    	// store timer 
    	this.timer = this.game.time.events;
    	// timer event for populating colums
    	this.eventTimer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

    	// create and start backign music
    	this.backingSound = this.add.audio('backingSound');
		this.backingSound.play();

	}

	addOnePipe(x, y) {
	    
	    // Create a pipe at the position x and y
	    var pipe = this.game.add.sprite(x, y, 'spriteSheet', 'fire');

	    // Add the pipe to our previously created group
	    this.pipes.add(pipe);

	    // Enable physics on the pipe 
	    this.game.physics.arcade.enable(pipe);

	    // Add velocity to the pipe to make it move left
	    pipe.body.velocity.x = -200; 

	    // No Gravity
	    pipe.body.allowGravity = false;

	    // Automatically kill the pipe when it's no longer visible 
	    pipe.checkWorldBounds = true;
	    pipe.outOfBoundsKill = true;
	}

	addRowOfPipes() {
	    // Randomly pick a number between 1 and 5
	    // This will be the hole position
	    var hole = Math.floor(Math.random() * 3) + 1;

	    // Add the 6 pipes 
	    // With one big hole at position 'hole' and 'hole + 1'
	    for (var i = 0; i < 8; i++){
	        if (i != hole && i != hole + 1){
	            this.addOnePipe(450, i * 40 + 25);   
	    	}
	    }

    	this.score += 1;
		this.labelScore.text = this.score;  

	}

	update() {
		
		//if player allive then do paltform
		if(this.player.alive){
			// //loop through alive sprites in paltform group for collision
			// this.platformPool.forEachAlive(function(platform, index){
			// 	this.game.physics.arcade.collide(this.player, platform);
			// 	//check if platform needs to be killed
			// 	if(platform.length && platform.children[platform.length -1].right < 0){
			// 		platform.kill();
			// 	}	
			// },this)

			// // check if player overlaps coins then play sound
			// this.game.physics.arcade.overlap(this.player, this.coinsPool, this.collectCoin, null, this);
			// set velocity of player
			// if(this.player.body.touching.down){
			// 	this.player.body.velocity.x = this.levelSpeed;
			// }else{
			// 	// make sure player doesnt jump forward just up!
			// 	this.player.body.velocity.x = 0;
			// }

			// check player input
			if(this.cursors.up.isDown || this.game.input.activePointer.isDown){
				this.playerJump();
			}else if(this.cursors.up.isUp || this.game.input.activePointer.isUp){
				this.isJumping = false;
				this.jumpPeaked = false;
			}

			// //if platform completey visable in viewport need to create one
			// if(this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length -1].right < this.game.world.width){
			// 	this.createPlatform();
			// }

			// //kill coins that leave the screen
			// this.coinsPool.forEachAlive(function(coin){
			// 	if(coin.right <= 0) {
			// 		coin.kill();
			// 	}
			// }, this);

			//set rotation based on postion of player
			if (this.player.angle < 20){
  		  		this.player.angle += 1;
			}
		}
		//check if player needs to die
		if(!this.gameOverTrigger){
			if(this.player.top >= this.game.world.height || this.player.left <= 0){
				this.gameOver();
				this.gameOverTrigger = true;
				
			}
		}

		this.game.physics.arcade.overlap( this.player, this.water, this.waterCollision, null, this); 
		this.game.physics.arcade.overlap( this.player, this.pipes, this.columCollision, null, this);

		// //loop through alive sprites in paltform group for collision
		// this.platformPool.forEachAlive(function(platform, index){
		// 	this.game.physics.arcade.collide(this.player, platform);
		// 	//check if platform needs to be killed
		// 	if(platform.length && platform.children[platform.length -1].right < 0){
		// 		platform.kill();
		// 	}	
		// },this)

	}

	waterCollision(){
    	if(!this.gameOverCheck) {
    		console.log("Water particle effect please!!!")
			//  Position the emitter where the mouse/touch event was
	    	this.emitter.x = this.player.x;
	    	this.emitter.y = this.player.y+45;
	    	this.emitter.start(true, -1, null, 100);
	    	// Game over
			this.gameOver(true);	
		}
	}

	columCollision(){
    	if(!this.gameOverCheck) {
			console.log("Blood particle effect please!!!")
			//  Position the emitter where the mouse/touch event was
	    	this.bloodEmitter.x = this.player.x;
	    	this.bloodEmitter.y = this.player.y+45;
	    	this.bloodEmitter.start(true, -1, null, 100);
	    	// Game over
			this.gameOver(false);	
		}
	}

	gameOver(waterCollision){
		console.log('games end');
		if(waterCollision==true){
			this.gameOverCheck = true;	
		}

		// Player death animation or stop animations
		this.player.animations.stop();
		// this.player.stop('running');
		// this.player.kill();
		this.game.add.tween(this.player).to({angle: -720}, 1000).start();
		this.game.add.tween(this.player).to({x: this.player.x-5}, 400).start();
		
		// It means the player is already falling off the screen
		if (this.player.alive == false){
		    return;
		}

		// Set the alive property of the player to false
		this.player.alive = false;

		// Prevent new pipes from appearing
    	this.game.time.events.remove(this.eventTimer);

		// Go through all the pipes, and stop their movement
		this.pipes.forEach(function(p){
		    p.body.velocity.x = 0;
		}, this);
		
    	// Stop all background animations
    	this.water.stopScroll();
		this.town.stopScroll();
		this.meadow.stopScroll();
		this.background.stopScroll();
    	
		//update highscore
		this.highscoreUpdate();
		//gamer over overlay
		this.overlay = this.add.bitmapData(this.game.width,this.game.height);
		this.overlay.ctx.fillStyle = '#000';
		this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);
		//sprite for the overlay
		let panel = this.add.sprite(0, this.game.height, this.overlay);
		panel.alpha = 0.55;
		//overlay raising tween animation
		let gameOverPanel = this.add.tween(panel);
		gameOverPanel.to({ y:0 }, 500, "Linear", true, 2000);
		//stop all movment 
		gameOverPanel.onComplete.add(function(){
			//game over text
			let style = {font:'30px Arial', fill:'#fff'}
			// this.add.text(this.game.width/2, this.game.height/2, 'GAME OVER', style).anchor.setTo(0.5);
			// Use sprite for game over!
			this.gameOverSprite = this.add.sprite(this.game.width/2, this.game.height/2-75, 'spriteSheet', 'gameover');
			this.gameOverSprite.anchor.setTo(0.5);
			this.gameOverSprite.scale.setTo(2);

			//High score
			style = {font:'20px Arial', fill:'#fff'}
			this.add.text(this.game.width/2, this.game.height/2 -25, 'High score: '+ this.highscore, style).anchor.setTo(0.5);
			//Your Score
			this.add.text(this.game.width/2, this.game.height/2 +5, 'Your score: '+ this.myCoins, style).anchor.setTo(0.5);
			//Tap to play again
			style = {font:'10px Arial', fill:'#fff'}
			this.add.text(this.game.width/2, this.game.height/2 +50, 'Tap to play again', style).anchor.setTo(0.5);
			//restart
			this.game.input.onDown.addOnce(this.restart, this);
		},this)
		gameOverPanel.start();
	
	}

	highscoreUpdate(){
		this.highscore = +localStorage.getItem('highScore');
		//do we have a new highscore?
		if(this.highscore < this.myCoins){
			this.highscore = this.myCoins;
			//save new high score in local storage
			localStorage.setItem('highscore', this.highscore);
		}
	}

	restart(){
		this.backingSound.stop();
		this.gameOverTrigger = false;
		this.game.state.start('GameStateA');
	}

	// collectCoin(player, coin){
	// 	coin.kill();
	// 	//increase my coins
	// 	this.myCoins ++;
	// 	this.coinsCountLabel.text = this.myCoins;
	// 	//play sound
	// 	this.coinSound.play();

	// }

	playerJump() {
		
		if(!this.jumpPeaked){
			//starting point of the jump
			this.startJumpY = this.player.y;
			//keep track of the fact that it is jumping
			this.isJumping = true;
			this.jumpPeaked = true;

			//check if new y is going to hit bounds
			this.player.body.velocity.y = -150;
			//set rotation based on postion of player
			this.game.add.tween(this.player).to({angle: -20}, 100).start();

			//play jump sound
			this.jumpSound.play();
		}

		if (this.player.alive == false){
		    return; 
		}

		//make jump last longer
		// else if(this.isJumping && !this.jumpPeaked){
		//  	let distanceJumped = this.startJumpY - this.player.y;

		//  	if(distanceJumped <= this.maxJumpDistance){
		//  		//keep jumping
		//  		this.player.body.velocity.y = -300;
		//  	}else{
		//  		this.jumpPeaked = true;
		//  	}
		// }
	}

	// loadLevel(){
	//     this.createPlatform();
	// }

	// createPlatform(){
	// 	let nextPlatformData = this.genrateRandomPlatform();
	// 	if(nextPlatformData){
	// 		//
	// 		this.currentPlatform = this.platformPool.getFirstDead();
	// 		if(!this.currentPlatform){
	// 			// create new platform
	// 			this.currentPlatform = new Platform(this.game, this.floorPool, nextPlatformData.numTiles, this.game.world.width + nextPlatformData.separation, nextPlatformData.y, -this.levelSpeed, this.coinsPool);
	// 		}else{
	// 			// use prepare method to object pool platforms
	// 			this.currentPlatform.prepare(nextPlatformData.numTiles, this.game.world.width + nextPlatformData.separation, nextPlatformData.y, -this.levelSpeed);
	// 		}
	// 		this.platformPool.add(this.currentPlatform);
	// 		this.currentIndex ++;
			
	// 	}
	// }

	// genrateRandomPlatform(){
	// 	let data = {};

	// 	//distance from the previous platform
	// 	let minSepration = 60;
	// 	let maxSepration = 200;
	// 	data.separation = minSepration + Math.random() * (maxSepration - minSepration);

	// 	//y in regards to previous platform
	// 	let minDifY = -120;
	// 	let maxDifY = 200;
	// 	data.y = this.currentPlatform.children[0].y + minDifY + Math.random() * (maxDifY - minDifY);
	// 	data.y = Math.max(150, data.y);
	// 	data.y = Math.min(this.game.world.height - 50, data.y);

	// 	//number of tiles
	// 	let minTiles = 1;
	// 	let maxTiles = 5;
	// 	data.numTiles = minTiles + Math.random() * (maxTiles - minTiles);

	// 	return data;
	// }

	// render(){
	// 	// debug
		
 //        this.game.debug.body(this.player);
 //        this.game.debug.body(this.water);

 //        this.pipes.forEach(function(p){
	// 	    this.game.debug.body(p);
	// 	}, this);
	// }
	
}

export default GameStateA;
