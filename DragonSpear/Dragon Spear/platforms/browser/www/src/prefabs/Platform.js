// class paltform

// class Platform extends Phaser.Group {

// 		constructor(game, floorPool, numTiles, x, y, levelSpeed, coinsPool) {
//     		console.log('help!!');
//     		super(this, game);

// 	    	this.tileSize = 40;
// 	    	this.game = game;
// 	    	this.enableBody = true;
// 	    	this.floorPool = floorPool;

// 	    	this.prepare(numTiles, x, y);
//   	}

//   	prepare(numTiles, x, y){
//		 	//make alive
// 			this.alive = true;
//   		
//			var i = 0;
// 	    	while(i < numTiles){
// 	    	  let floorTile = this.floorPool.getFirstExisits(false);
	    	  
// 	    	  if(!floorTile){
	    	  	
// 	    	  	floorTile = new Phaser.Sprite(game, x + i * this.tileSize, y, 'spriteSheet', 'floor');	
// 	    	  }else{
// 	    	  	floorTile.reset(x + i * this.tileSize, y);
// 	    	  }
	
// 	    	  this.add(floorTile);
// 	    	  i++;
// 	    	}
	
// 	    	//set physics property
// 	    	this.setAll('body.immovable', true);
// 	    	this.setAll('body.allowGravity', true);

//   	}
//
//		kill(){
//		  this.alive = false;
//		  this.callAll('kill');
//
//		  // temp array to get all children
//		  let sprites = [];
//		  this.forEach(function(tile){
//		  	sprites.push(tile);
//		  }, this);
//
//		  // get all sprites from temp array and add to pool
//		  sprites.forEach(function(tile){
//		  	this.floorPool.add(tile);
//		  }, this);
//		}
// }

// export default Platform;


const Platform = function(game, floorPool, numTiles, x, y, levelSpeed, coinsPool) {
  Phaser.Group.call(this, game);
  
  this.tileSize = 40;
  this.game = game;
  this.enableBody = true;
  this.floorPool = floorPool;
  this.coinsPool = coinsPool;
  
  
  this.prepare(numTiles, x, y, levelSpeed);  
};

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles, x, y, levelSpeed) {
  //make alive
  this.alive = true;	
  var i = 0;
  while(i < numTiles){
    
    var floorTile = this.floorPool.getFirstExists(false);
    
    if(!floorTile) {
      var floorTile = new Phaser.Sprite(this.game, x + i * this.tileSize, y, 'spriteSheet', 'spearClean');
    }
    else {
      floorTile.reset(x + i * this.tileSize, y);
    }
      
    this.add(floorTile);    
    i++;
  }

  //add coins
  this.addCoins(levelSpeed);
  
  //set physics properties
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
  this.setAll('body.velocity.x', levelSpeed);
}

Platform.prototype.kill = function() {
  this.alive = false;
  this.callAll('kill');
  console.log('kill');
  // temp array to get all children
  let sprites = [];
  this.forEach(function(tile){
  	sprites.push(tile);
  }, this);
  // get all sprites from temp array and add to pool
  this.forEach(function(tile){
  	this.floorPool.add(tile);
  }, this);
  console.log(this.floorPool.children)
}

Platform.prototype.addCoins = function(levelSpeed) {
	let coinsY = 90 + Math.random() * 110;
	
	let hasCoin;
	this.forEach(function(tile){
		//40% chance of coin
		hasCoin = Math.random() <= 0.4; 
		
		if(hasCoin){
			let coin = this.coinsPool.getFirstExists(false);
			if(!coin){
				coin = new Phaser.Sprite(this.game, tile.x, tile.y - coinsY, 'spriteSheet', 'redGem')
				this.coinsPool.add(coin);
			}else{
				coin.reset(tile.x, tile.y - coinsY);
			}

			coin.body.velocity.x = levelSpeed;
			coin.body.allowGravity = false;
		}
	},this)
}

export default Platform;