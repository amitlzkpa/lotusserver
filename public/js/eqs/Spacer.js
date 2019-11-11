




function Spacer() {


  this.info = {
    "name": "Spacer",
    "description": "A ring expanding out.",
    "author": "amitlzkpa"
  }


  // --------------------------



  this.getParamaterConfiguration = function() {
    return [];
  }


  // --------------------------


  let spacer;


  this.init = async function(scene, PARAMOBJ) {

    let geometry = new THREE.RingGeometry( 1000, 1200, 64 );
    let material = new THREE.MeshBasicMaterial( { color: 0xE80C7A, side: THREE.DoubleSide, transparent: true, opacity: 0.3 } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = -Math.PI/2;
    scene.add( mesh );
    spacer = mesh;
  }


  // --------------------------


  let VIZOBJS = {};

  let i = 0;
  let lim = 2;
  let maxScale = 6;

  let f = false;




  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {

    if(i == 0) {
      spacer.scale.x += 0.05;
      spacer.scale.y += 0.05;

      if (spacer.scale.x > maxScale || spacer.scale.y > maxScale) {
        spacer.scale.x = 1;
        spacer.scale.y = 1;
      }
    }

    i++;
    i %= lim;

  }


}








async function getRefs() {
  return [];
}


async function getObj() {
  return Spacer;
}