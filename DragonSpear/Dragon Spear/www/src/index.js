// import GameState from 'states/GameState';
import GameStateA from 'states/GameStateA';
import BootState from 'states/BootState';
import PreloadState from 'states/PreloadState';
import HomeState from 'states/HomeState';
import Scaler from 'objects/Scaler';
// import GameStateB from 'states/GameStateB';

// let gameScreen = new Scaler(700, 350);

class Game extends Phaser.Game {

	constructor() {
		super(480, 320, Phaser.AUTO, 'content');
		// super('100%', '100%', Phaser.AUTO, 'content');
		// super(gameScreen.w, gameScreen.h, Phaser.AUTO, 'content', null, '#000');

		// game = new Phaser.Game(800, 600, Phaser.AUTO, '', {init: init, preload: preload, create: create});
		// this.state.add('GameState', GameState, false);
		this.state.add('BootState', BootState, false);
		this.state.add('PreloadState', PreloadState, false);
		this.state.add('HomeState', HomeState, false);
		this.state.add('GameStateA', GameStateA, false);
		// this.state.add('GameStateB', GameStateB, false);
		// this.state.add('GameStateA', this.GameStateA);
		this.state.start('BootState');
	}

}
new Game();