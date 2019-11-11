

function SpiralArray_Basic() {
    


  this.info = {
    "name": "SpiralArray_Basic",
    "description": "",
    "author": "amitlzkpa"
  }



  // --------------------------



  // ref: https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733
  function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
      pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
    
      if(pointIsWorld){
          obj.parent.localToWorld(obj.position); // compensate for world coordinate
      }
    
      obj.position.sub(point); // remove the offset
      obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
      obj.position.add(point); // re-add the offset
    
      if(pointIsWorld){
          obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
      }
    
      obj.rotateOnAxis(axis, theta); // rotate the OBJECT
      return obj;
  }




  function getCone(size=2, height=4) {
      // geometry
      let geometry = new THREE.ConeGeometry( 6, 8, 4 );
      // material
      let material = new THREE.MeshPhongMaterial( {
          color: 0xFF530D,
          flatShading: false,
      } );
      // mesh
      mesh = new THREE.Mesh( geometry, material );
      mesh.scale.set(size, height, size);
      return mesh;
  }



  // --------------------------



  this.getParamaterConfiguration = function() {
    return [];
  }



  // --------------------------




  let countX = 13;
  let countY = 21;
  let r1 = 100;
  let r2 = 575;
  let delta = (r2-r1)/countY;
  let seedObjs = {};
  let seedArray = [];
  let startPos = [];
  let seedSize = 2;
  let rot = 1.41
  let heightMax = 0.2;
  let freq = 'mid';



  function getSpiral() {
    let retObj = new THREE.Object3D();
    for (let i=0; i<countY; i++) {
      let seedArrY = [];
      let startPosY = [];
      for (let j=0; j<countX; j++) {
        let h = heightMax * ((countX-j)/countX);
        let seed = getCone(seedSize, h);

        let d = r1 + (delta * j);
        seed.position.x = d;

        let r = rot * (j/countX);
        rotateAboutPoint(seed, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), r);

        seed.castShadow = true;
        seed.name = `seed-${i}-${j}`;
        seedArrY.push(seed);
        startPosY.push(seed.position);
        retObj.add(seed);
      }
      for(let k=0; k<seedArrY.length; k++) {
        let rr = (Math.PI * 2) * (i/countY);
        rotateAboutPoint(seedArrY[k], new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), rr);
      }
      seedArray.push(seedArrY);
      startPos.push(startPosY);
    }
    return retObj;
  }



  function updateSpiral(val=1) {

    for (let i=0; i<countY; i++) {
      for (let j=0; j<countX; j++) {
        let h = heightMax * ((countX-j)/countX);
        let s = seedArray[i][j];
        s.scale.y = (val * h);
        let sPos = startPos[i][j];
        s.position.set(sPos.x, sPos.y, sPos.z);
      }
    }

  }
  


  this.init = async function(scene, PARAMOBJ) {
    if(typeof PARAMOBJ !== "undefined") {

        // radius = PARAMOBJ["radius"] || radius;
    }
    scene.add(getSpiral());


  }



  // --------------------------



  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {



    let arr = (freq == 'hig') ? FREQOBJ['higFreqArray'] :
              (freq == 'mid') ? FREQOBJ['midFreqArray'] :
                                FREQOBJ['lowFreqArray'];


    let t = 0;
    arr.forEach(n => t += n);
    let avg = t / arr.length;


    updateSpiral(avg);

  }



}





async function getRefs() {
  return [];
}



async function getObj() {
  return SpiralArray_Basic;
}