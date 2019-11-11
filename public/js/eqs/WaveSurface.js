




function WaveSurface() {


  this.info = {
    "name": "WaveSurface",
    "description": "Surface to create waves on.",
    "author": "amitlzkpa"
  }



  // --------------------------



  this.getParamaterConfiguration = function() {
    return [];
  }



  // --------------------------






  // --------------------------
  


  let VIZOBJS = [];



  this.init = async function(scene, PARAMOBJ) {
    // ref: https://steemit.com/utopian-io/@clayjohn/learning-3d-graphics-with-three-js-or-procedural-geometry
    makeQuad = function(geometry, position, addFace, verts) {
      geometry.vertices.push(position);

      if (addFace) {
        let index1 = geometry.vertices.length - 1;
        let index2 = index1 - 1;
        let index3 = index1 - verts;
        let index4 = index1 - verts - 1;

        geometry.faces.push(new THREE.Face3(index2, index3, index1));
        geometry.faces.push(new THREE.Face3(index2, index4, index3));
      }
    };



    makeTile = function(size, res) {
      geometry = new THREE.Geometry();
      for (let i = 0; i <= res; i++) {
        for (let j = 0; j <= res; j++) {
          let z = j * size;
          let x = i * size;
          let position = new THREE.Vector3(x, 0, z);
          let addFace = (i > 0) && (j > 0);
          this.makeQuad(geometry, position, addFace, res + 1);
        }
      }
      geometry.computeFaceNormals();
      geometry.normalsNeedUpdate = true;

      return geometry;
    };


    let wavyMeshGeometry = makeTile(meshSize, meshSegments)
    let wavyMeshMaterial = new THREE.MeshBasicMaterial({color: 0x464646, wireframe: true});
    let wMesh = new THREE.Mesh(wavyMeshGeometry, wavyMeshMaterial);
    wMesh.position.x = -(meshSize * meshSegments)/2;
    wMesh.position.z = -(meshSize * meshSegments)/2;
    scene.add(wMesh);
    wavyMesh = wMesh;
  }

  let meshSize = 50;
  let meshSegments = 100;
  let wavyMesh;

  // --------------------------


  let zFuncText = "cos(x) * sqrt(y)";
  let zFunc = Parser.parse(zFuncText);


  let xDirFreq = 30;
  let yDirFreq = 400;
  let yDirAmp = 1;
  let xDirAmp = 1;
  let xDirIdx = Math.round((xDirFreq/48000) * 512);
  let yDirIdx = Math.round((yDirFreq/48000) * 512);
  let xVal, yVal;
  // console.log(yDirIdx);


  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {
    // return;

    let allFreqArray = FREQOBJ['allFreqArray'];
    xDirAmp = remap(0, 255, 0, 1, allFreqArray[xDirIdx]);
    yDirAmp = remap(0, 255, 0, 1, allFreqArray[yDirIdx]);

    let idx;
    let meshV;
    let v;
    let v1, v2;
    for(let j=0; j<meshSegments; j++) {
      for (let i=0; i<meshSegments; i++) {
        idx = (j * meshSegments) + i
        meshV = wavyMesh.geometry.vertices[idx]
        v1 = zFunc.evaluate({x:meshV.z, y:meshV.x});
        v2 = zFunc.evaluate({x:meshV.x, y:meshV.z});
        v = (v1 * xDirAmp) + (v2 * yDirAmp);
        meshV.y = v
      }
    }
    wavyMesh.geometry.verticesNeedUpdate = true;
  }
}









async function getRefs() {
  return  [
            "js/parser.js",
          ];
}



async function getObj() {
    return WaveSurface;
}