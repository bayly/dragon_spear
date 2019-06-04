// class paltform

class Platformer extends Phaser.Group {

	constructor(game, floorPool, numTiles, x, y) {
    	super(this, game);
    	
	    this.tileSize = 40;
	    this.game = game;
	    this.enableBody = true;
	    this.floorPool = floorPool;

	    this.prepare(numTiles, x, y);
  	}

  	prepare(numTiles, x, y){
  		var i = 0;
	    while(i < numTiles){
	      let floorTile = this.floorPool.getFirstExisits(false);
	      
	      if(!floorTile){
	      	
	      	floorTile = new Phaser.Sprite(game, x + i * this.tileSize, y, 'spriteSheet', 'floor');	
	      }else{
	      	floorTile.reset(x + i * this.tileSize, y);
	      }

	      this.add(floorTile);
	      i++;
	    }

	    //set physics property
	    this.setAll('body.immovable', true);
	    this.setAll('body.allowGravity', true);

  	}
}

export default Platformer;


// const Platform = function(game, numTiles, x, y) {
//   Phaser.Group.call(this, game);
  
//   this.tileSize = 40;
  
//   var i = 0;
//   while(i < numTiles){
    
//     var floorTile = new Phaser.Sprite(game, x + i * this.tileSize, y, 'spriteSheet', 'floor');
    
//     this.add(floorTile);
    
//     i++;
//   }
// };

// Platform.prototype = Object.create(Phaser.Group.prototype);
// Platform.prototype.constructor = Platform;

// export default Platform;