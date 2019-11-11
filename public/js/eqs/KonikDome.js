




function KonikDome() {


  this.info = {
    "name": "KonikDome",
    "description": "",
    "author": "amitlzkpa"
  }


  // --------------------------



  this.getParamaterConfiguration = function() {
    return [];
  }


  // --------------------------


  let radius = 400;
  let height = 600;

  let divs = 6;
  let color = 0xffff00;

  this.init = async function(scene, PARAMOBJ) {

    let points = [];
    let theta = 0;
    let halfPI = Math.PI/2;
    for ( let i = 0; i <= divs; i ++ ) {
      theta = (i/divs) * halfPI;
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * radius + (radius/10), -( i - (divs/2) ) * (height/4) ) );
    }
    let geometry = new THREE.LatheGeometry( points );
    let material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
    let lathe = new THREE.Mesh( geometry, material );
    scene.add( lathe );

  }


  // --------------------------




  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {


  }


}








async function getRefs() {
  return [];
}


async function getObj() {
  return KonikDome;
}