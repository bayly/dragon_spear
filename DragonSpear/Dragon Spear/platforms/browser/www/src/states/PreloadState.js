
class PreloadState extends Phaser.State {
	// preload assets
	preload() {
		console.log('Monkey 3');

		this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.logo.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY +128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		this.preloadBar.scale.setTo(3);

		this.game.load.setPreloadSprite(this.preloadBar);

		//load audio
		this.game.load.audio('coin', ['../assets/audio/coin.ogg', '../assets/audio/coin.mp3']);
		this.game.load.audio('jump', ['../assets/audio/jump.ogg', '../assets/audio/jump.mp3']);
		this.game.load.audio('backingSound', ['../assets/audio/seige_128.ogg', '../assets/audio/seige_128.mp3']);
		this.game.load.audio('menu_Music', ['../assets/audio/menu_Music.ogg', '../assets/audio/menu_Music.mp3']);
		
		//load spritesheet
		this.game.load.atlas('spriteSheet', '../assets/images/spriteSheet.png', '../assets/images/spriteSheet.json');
		// load level data
		// this.load.text('level1', '../assets/data/level1.json');
		
	}

	create() {
		this.state.start('HomeState');
	}

}

export default PreloadState;
