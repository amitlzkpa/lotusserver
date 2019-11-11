

function Temple() {
    


  this.info = {
    "name": "Temple",
    "description": "",
    "author": "amitlzkpa"
  }



  // --------------------------







  // --------------------------



  this.getParamaterConfiguration = function() {
    let retList = [
    ];
    return retList;
  }



  // --------------------------


  let frags_S0 = [];
  let frags_S1 = [];
  let frags_S2 = [];
  let frags_S3 = [];


  function getHalfPondFraction_S0() {

    let retObj = new THREE.Object3D();

    let prof = new verb.geom.BezierCurve( [[ 0,   0,   200  ],  [  0,  350,  230  ], [ 0,  400 ,  140  ],  [   10,  470,  0  ]] );
    let srf = new verb.geom.RevolvedSurface( prof, [0,0,0], [0,1,0], (2* Math.PI)/9 );

    let geometry = srf.toThreeGeometry();
    let material = new THREE.MeshNormalMaterial({ wireframe: true, side: THREE.DoubleSide });
    let frag = new THREE.Mesh(geometry, material);
    retObj.add(frag);
    frags_S0.push(frag);

    return retObj;

  }


  function getHalfPondFraction_S1() {

    let retObj = new THREE.Object3D();

    let c1Pts = [ [ 126,   40,   343  ],  [  110,  40,  400  ], [ 60,  40 ,  470  ],  [   0,  0,  483  ] ];
    let c2Pts = [ [ 126,   40,   340  ],  [  110,  150,  200  ], [ 80,  300 ,  160  ],  [   0,  470,  183  ] ];
    let c1 = verb.geom.NurbsCurve.byKnotsControlPointsWeights( 3, [0,0,0,0,1,1,1,1], c1Pts, [ 1, 1, 1, 1 ]);
    let c2 = verb.geom.NurbsCurve.byKnotsControlPointsWeights( 3, [0,0,0,0,1,1,1,1], c2Pts, [ 1, 1, 1, 1, 1 ]);
    let curves = [c1, c2];
    let srf = verb.geom.NurbsSurface.byLoftingCurves( curves, 3 );
    let geometry = srf.toThreeGeometry();
    let material = new THREE.MeshNormalMaterial({ wireframe: false, side: THREE.DoubleSide });
    let frag = new THREE.Mesh(geometry, material);
    retObj.add(frag);
    frags_S1.push(frag);

    return retObj;

  }


  function getHalfPondFraction_S2() {

    let retObj = new THREE.Object3D();

    let c1Pts = [ [ 133,   40,   363  ],  [  120,  60,  420  ], [ 60,  80 ,  490  ],  [   0,  0,  523  ] ];
    let c2Pts = [ [ 133,   40,   366  ],  [  120,  160,  320  ], [ 60,  200 ,  320  ],  [   0,  300,  323  ] ];
    let c1 = verb.geom.NurbsCurve.byKnotsControlPointsWeights( 3, [0,0,0,0,1,1,1,1], c1Pts, [ 1, 1, 1, 1 ]);
    let c2 = verb.geom.NurbsCurve.byKnotsControlPointsWeights( 3, [0,0,0,0,1,1,1,1], c2Pts, [ 1, 1, 1, 1, 1 ]);
    let curves = [c1, c2];
    let srf = verb.geom.NurbsSurface.byLoftingCurves( curves, 3 );
    let geometry = srf.toThreeGeometry();
    let material = new THREE.MeshNormalMaterial({ wireframe: false, side: THREE.DoubleSide }); 
    let frag = new THREE.Mesh(geometry, material);
    retObj.add(frag);
    frags_S2.push(frag);

    return retObj;

  }


  function getHalfPondFraction_S3() {

    let retObj = new THREE.Object3D();

    let c1Pts = [ [ 212,   240,   583  ],  [  120,  180,  560  ], [ 60,  140,  570  ],  [   0,  0,  543  ] ];
    let c2Pts = [ [ 133,   40,   363  ],  [  120,  60,  420  ], [ 60,  80 ,  490  ],  [   0,  0,  523  ] ];
    let c1 = verb.geom.NurbsCurve.byKnotsControlPointsWeights( 3, [0,0,0,0,1,1,1,1], c1Pts, [ 1, 1, 1, 1 ]);
    let c2 = verb.geom.NurbsCurve.byKnotsControlPointsWeights( 3, [0,0,0,0,1,1,1,1], c2Pts, [ 1, 1, 1, 1, 1 ]);
    let curves = [c1, c2];
    let srf = verb.geom.NurbsSurface.byLoftingCurves( curves, 3 );
    let geometry = srf.toThreeGeometry();
    let material = new THREE.MeshNormalMaterial({ wireframe: false, side: THREE.DoubleSide });
    let frag = new THREE.Mesh(geometry, material);
    retObj.add(frag);
    frags_S3.push(frag);

    return retObj;

  }


  function getPondFraction() {

    let full = new THREE.Object3D();

    let lh_S0 = getHalfPondFraction_S0();
    let rh_S0 = getHalfPondFraction_S0();
    lh_S0.scale.x = -1;
    full.add(lh_S0);
    full.add(rh_S0);
    let lh_S1 = getHalfPondFraction_S1();
    let rh_S1 = getHalfPondFraction_S1();
    lh_S1.scale.x = -1;
    full.add(lh_S1);
    full.add(rh_S1);
    let lh_S2 = getHalfPondFraction_S2();
    let rh_S2 = getHalfPondFraction_S2();
    lh_S2.scale.x = -1;
    full.add(lh_S2);
    full.add(rh_S2);
    let lh_S3 = getHalfPondFraction_S3();
    let rh_S3 = getHalfPondFraction_S3();
    lh_S3.scale.x = -1;
    full.add(lh_S3);
    full.add(rh_S3);

    return full;

  }




  this.init = async function(scene, PARAMOBJ) {

    let count = 9;
    let sceneObj = new THREE.Object3D();
    for(let i=0; i<count; i++) {
      let r = (Math.PI * 2) * (i/count);
      let frc = getPondFraction();
      frc.rotation.set(0, r, 0);
      sceneObj.add(frc);
    }
    scene.add(sceneObj);

  }


  // --------------------------


  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {

    let lowAvg = average(FREQOBJ['lowFreqArray']);
    let midAvg = average(FREQOBJ['midFreqArray']);
    let higAvg = average(FREQOBJ['higFreqArray']);

    let lowAvgNorm = remap(0, 40, 0.7, 1.1, lowAvg);
    let midAvgNorm = remap(0, 40, 0.7, 1.1, midAvg);
    let higAvgNorm = remap(0, 40, 0.7, 1.1, higAvg);

    frags_S1.forEach(f => { f.scale.y = higAvgNorm; });
    frags_S2.forEach(f => { f.scale.y = lowAvgNorm; });
    frags_S3.forEach(f => { f.scale.y = midAvgNorm; });

  }
}





async function getRefs() {
  return ["js/eqs/refs/verb.min.js", "js/eqs/refs/verb-utility.js"];
}



async function getObj() {
  return Temple;
}