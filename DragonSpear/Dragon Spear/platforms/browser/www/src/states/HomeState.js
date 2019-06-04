
class HomeState extends Phaser.State {

	init() {
		console.log('hello!');
	}

	create() {
		// Menu page here!

		// this.game.input.onDown.add(function(){
		// 	// stop menu music
  //   		this.menu_Music.stop();
		// 	this.state.start('GameStateA');
		// }, this);	

		//sprite for the overlay
		let panel = this.add.sprite(0, this.game.height, this.overlay);
		// Title Over top
		this.title = this.add.sprite(this.game.width/2, this.game.height/2-125, 'spriteSheet', 'DragonSpear');
		this.title.anchor.setTo(0.5);
		this.title.scale.setTo(2);

		// Spear for Shield
		this.menuHanger = this.add.sprite(this.game.width/2-125, this.game.height/2-50, 'spriteSheet', 'hanger');
		this.menuHanger.anchor.setTo(0.5);
		this.menuHanger.scale.setTo(2);

		// Shield for menu bg
		this.menuShield = this.add.sprite(this.game.width/2-125+30, this.game.height/2, 'spriteSheet', 'shield');
		this.menuShield.anchor.setTo(0.5);
		this.menuShield.scale.setTo(2);

		// Start button
		this.startButton = this.add.sprite(this.game.width/2-125+22, this.game.height/2, 'spriteSheet', 'startButton');
		this.startButton.anchor.setTo(0.5);
		this.startButton.scale.setTo(2);
		this.startButton.inputEnabled = true;

		// Score button
		this.scoreButton = this.add.sprite(this.game.width/2-125+22, this.game.height/2+35, 'spriteSheet', 'scoreButton');
		this.scoreButton.anchor.setTo(0.5);
		this.scoreButton.scale.setTo(2);
		this.scoreButton.inputEnabled = true;

		// Credits button
		this.creditsButton = this.add.sprite(this.game.width/2-125+22, this.game.height/2+70, 'spriteSheet', 'creditsButton');
		this.creditsButton.anchor.setTo(0.5);
		this.creditsButton.scale.setTo(2);
		this.creditsButton.inputEnabled = true;

		this.startButton.events.onInputDown.add(function(){
			// stop menu music
    		this.menu_Music.stop();
			this.state.start('GameStateA');
		}, this);

		this.scoreButton.events.onInputDown.add(function(){
			// Score state requested
			console.log('Score state requested');
			// this.state.start('GameStateA');
		}, this);

		this.creditsButton.events.onInputDown.add(function(){
			// Credits state requested
			console.log('Credits state requested');
			// this.state.start('GameStateA');
		}, this);	

		let style = {font:'35px Arial', fill:'#FFF'};
		this.game.add.text(30, this.game.world.centerY +100, 'TAP TO START', style);

		if(this.message){
			this.game.add.text(60, this.game.world.centerY -10, this.message, style);
		}

		this.player = this.add.sprite(50,50, 'spriteSheet', 'character/dragon01');
		this.player.anchor.setTo(0.5);

		this.menu_Music = this.add.audio('menu_Music');
		this.menu_Music.play();
		
	}
}

export default HomeState;
