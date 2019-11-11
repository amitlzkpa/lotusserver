




function DancingMesh() {


  this.info = {
    "name": "EqualizerTemplate",
    "description": "Skeleton template for making equalizers.",
    "author": "amitlzkpa"
  }



  // --------------------------



  this.getParamaterConfiguration = function() {
    return [];
  }



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


    let meshSize = 200;
    let meshSegments = 64;
    let dancingMeshGeometry = makeTile(meshSize, meshSegments)
    let dancingMeshMaterial = new THREE.MeshBasicMaterial({color: 0x464646, wireframe: true});
    let dancingMesh = new THREE.Mesh(dancingMeshGeometry, dancingMeshMaterial);
    dancingMesh.position.x = -(meshSize * meshSegments)/2;
    dancingMesh.position.z = -(meshSize * meshSegments)/2;
    scene.add(dancingMesh);
    VIZOBJS['dancingMesh'] = dancingMesh;
    VIZOBJS['meshSize'] = meshSize;
    VIZOBJS['meshSegments'] = meshSegments;
  }


  // --------------------------


  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {
    let lowFreqArray = FREQOBJ['lowFreqArray'];
    let midFreqArray = FREQOBJ['midFreqArray'];
    let higFreqArray = FREQOBJ['higFreqArray'];
    let freqMax = 86;

    let idx;
    let meshV;
    let v;
    let meshSize = VIZOBJS['meshSize'];
    let meshSegments = VIZOBJS['meshSegments'];
    let dancingMesh = VIZOBJS['dancingMesh'];
    for(let j=0; j<meshSegments; j++) {
      for (let i=0; i<meshSegments; i++) {
        idx = (j * meshSegments) + i
        meshV = dancingMesh.geometry.vertices[idx]
        v = modulus_idx(lowFreqArray, idx);
        v = remap(0, freqMax, 0, 40, v);
        meshV.y = v
      }
    }
    dancingMesh.geometry.verticesNeedUpdate = true;
  }
}









async function getRefs() {
    return [];
}



async function getObj() {
    return DancingMesh;
}