

class BootState extends Phaser.State {
	// initation preloader
	init() {
		
		this.game.stage.backgroundColor = '#000';

		// Stretch to fill
	    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	    // Keep original size
	    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

	    // Maintain aspect ratio
	    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

		// scale manager
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.game.scale.startFullScreen();
		// this.game.scale.stopFullScreen();

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

	    //physics system
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);    
	}

	preload() {
		console.log('Monkey');
		//load audio
		//load spritesheet
		// this.game.load.image('preloadBar', '../assets/images/bar.png');
		this.game.load.image('logo', '../assets/images/logo.png');

		//assets we'll use in the loading screen
    	this.load.image('preloadbar', '../assets/images/preloader-bar.png');
	}

	create() {
		console.log('Monkey 2');
		this.state.start('PreloadState');
	}

}

export default BootState;
