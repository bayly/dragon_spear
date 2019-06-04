// Enemy prefab

class Enemy extends Phaser.Sprite {

	constructor(game, x, y, key, health, enemyBullets, fireRate, bulletSpeed) {
		super(game, x, y, 'spriteSheet', key+'_enemy/'+key+'_1');

		let frame1 = key+'_enemy/'+key+'_1';
		let frame2 = key+'_enemy/'+key+'_2';
		let frame3 = key+'_enemy/'+key+'_3'; 
		console.log(frame1);
		console.log(frame2);
		console.log(frame3);
		//animtion
		this.enemyAnimtionFrameArray = [frame1,frame2,frame3,frame2,frame1];

		this.game = game;
		// this.game.physics.arcade.enable(this);
		


		this.animations.add('getHit', this.enemyAnimtionFrameArray, 25, false);
		//setup
		this.anchor.setTo(0.5);
		this.health = health;


		this.enemyBullets = enemyBullets;
		this.fireRate = fireRate;
		this.bulletSpeed = bulletSpeed;

		this.enemyTimer = this.game.time.create(false);
		this.enemyTimer.start();

		//create ai patterns for 

		/////// Possible Methods
		/* Move!!! */
		// moveAwayFromBullet();
		// wanderAroundAimlessly(start, end);

		// arcMovement(start, end){
		// 	//work out dynmaic arc based on start and end making sure not to go off screen

		// 	//work out highest point e.g lowest y 
		// 	pointsArray[1].y = start.y - end.y /2;
		// 	//work out bewteen start and end
		// 	pointsArray[1].x = start.x - end.x /2;
		// 	//work out bewteen start and end
		// 	pointsArray[0].x = start.x - end.x /2;

		// 	let pointsArray = [];
		// 	var tween = game.add.tween(movingSprite).to({
		//           x: [start.x, pointsArray[0].x, pointsArray[1].x, pointsArray[2].x, end.x],
		//           y: [start.y, pointsArray[0].y, pointsArray[1].y, pointsArray[2].y, end.y],
		//      }, 5000,Phaser.Easing.Quadratic.InOut, true, 0, -1).interpolation(function(v, k){
		//           return Phaser.Math.bezierInterpolation(v, k);
		//      }); 
		// };
		
		// zigzagMovemnet(start, end);

		/* Fire!!! */
		// fireAtPlayer(weapon);
		// fire(weapon);
		// fireHomingWeapon();
		// tractorBeam();

		/* Specilas */
		// bombAfterDeath();
		// kamakazi();
		// formationPattern();

		////////
		
		// Armed Decoy AI - moves ; shoots ; move away

		// start off screen left, top, right
		// move to postion 
		// stop and fire
		// move off screen oposite
		
		// Swarmer AI - Follow pattern for movement *options delta formation; Line then escape; or kamazie
		
		// Barrager AI - Slow moving ; fires beam shot / homing missle; moves away
		
		// Homing Missile AI - *special enemie fired from another ?
		
		// Simple Hologram AI - quick moving; single shot; tries to dodge player bulletts 

		// Bomber AI - slow moving; Shoot ring of bullets; moves offscreen

		// Bosses AI


		this.schedeuleShooting(this.fireRate, this.bulletSpeed);

	}

	damage(amount) {
		Phaser.Sprite.prototype.damage.call(this, amount);
		//play hit animtion
		this.play('getHit');

		//particle explosion
		if(this.health <= 0){
			let emitter = this.game.add.emitter(this.x, this.y, 100);
			emitter.makeParticles('spriteSheet', ['enemyParticle']);
			emitter.minParticleSpeed.setTo(-200, -200);
			emitter.maxParticleSpeed.setTo(200, 200);
			emitter.gravity = 0;
			emitter.start(true, 500, null, 100);

			// pause timer
			this.enemyTimer.pause();
		}
	}

	reset(x, y, health, key, scale, speedX, speedY) {
		Phaser.Sprite.prototype.reset.call(this, x, y, health );

		let frame1 = key+'_enemy/'+key+'_1';
		let frame2 = key+'_enemy/'+key+'_2';
		let frame3 = key+'_enemy/'+key+'_3'; 
		//animtion
		this.enemyAnimtionFrameArray = [frame1,frame2,frame3,frame2,frame1];		
		this.animations.add('getHit', this.enemyAnimtionFrameArray, 25, false);

		console.log('Frame reset >', key);
		this.loadTexture('spriteSheet', key+'_enemy/'+key+'_1');
		this.scale.setTo(scale);
		this.body.velocity.x = speedX;
		this.body.velocity.y = speedY;

		// resume timer
		this.enemyTimer.resume();
	}

	schedeuleShooting(fireRate, bulletSpeed) {
		this.shoot(bulletSpeed);
		this.enemyTimer.add(Phaser.Timer.SECOND *fireRate , this.schedeuleShooting, this);
	}

	shoot(bulletSpeed) {
		let bullet = this.enemyBullets.getFirstExists(false);
		if(!bullet){
			bullet = new EnemyBullet(this.game, this.x, this.bottom);
			this.enemyBullets.add(bullet);
		}else{
			// reset postion
			bullet.reset(this.x, this.y)
		}
		
		//console log below for seeing object pool in action
		// console.log(this.playerBullets.children.length);

		// set velocity
		bullet.body.velocity.y = this.bulletSpeed;
	}

	update() {
		if(this.x < 0.05 * this.game.world.width) {
			this.x = 0.05 * this.game.world.width +2;
			this.body.velocity.x *= -1;
		}
		else if(this.x > 0.95 * this.game.world.width) {
			this.x = 0.95 * this.game.world.width -2;
			this.body.velocity.x *= -1;
		}

		if(this.top > this.game.world.height) {
			this.kill();
		}
	}
}

export default Enemy;