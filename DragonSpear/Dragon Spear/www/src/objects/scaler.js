const Scaler = function(max_w, max_h) {
  
  //get both w and h of the screen (they might be exchanged )
  let w = window.innerWidth * window.devicePixelRatio;
  let h = window.innerHeight * window.devicePixelRatio;

  

  //get the actaul  w and h
  let landW = Math.max(w, h);
  let landH = Math.min(w, h);

  //do we need to scale to fit window
  if(landW > max_w){
  	let ratioW = max_w / landW;
  	landW *= ratioW; 
  	landH *= ratioW;
  }

  //do we need to scale to fit window
  if(landH > max_h){
  	let ratioH = max_h / landH;
  	landW *= ratioH; 
  	landH *= ratioH;
  }

  console.log(landW);
  console.log(landH);
  return {
  	w: landW,
  	h: landH
  }
};

export default Scaler;