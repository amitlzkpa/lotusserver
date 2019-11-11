


// ------------------------------------------------------------------------------.



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



// --------------------------



function getInnerProfile(type) {
  switch(type) {
    case "low": return [ [0, 0, 405], [0, 300, 620], [0, 552, 216] ];
    case "mid": return [ [0, 0, 805], [0, 30, 840], [0, 0, 1616] ];
    default: return [ [0, 0, 605], [0, 400, 720], [0, 952, 116] ];
  }
}



function getOuterProfile(type) {
  switch(type) {
    case "low": return [ [60, 0, 330], [60, 240, 360], [60, 407, 240] ];
    case "mid": return [ [10, 0, 810], [20, 20, 860], [10, 0, 1540] ];
    default: return [ [150, 0, 530], [260, 540, 660], [100, 847, 140] ];
  }
}



// ------------------------------------------------------------------------------




function WavyPetal() {


	this.info = {
		"name": "WavyPetal",
		"description": "Lotus petals moving to the sound of music.",
		"author": "amitlzkpa"
	}



  // --------------------------



  this.getParamaterConfiguration = function() {
    let retList = [
        {
            type: "slider",
            name: 'copies',
            label: 'Count',
            description: 'Number of petals.',
            min: 3,
            max: 8,
            value: 4
        },
        {
            type: "color",
            name: 'color',
            label: 'Color',
            description: 'Set the color.',
            value: 0xee7785
        },
        {
            type: "single-select",
            name: 'profileIn',
            label: 'Middle profile',
            description: 'Select the profile along the center of the petal.',
            options: [ "low", "mid", "hig" ],
            value: "high"
        },
        {
            type: "single-select",
            name: 'profileOut',
            label: 'Edge profile',
            description: 'Select the profile along the edge of the petal.',
            options: [ "low", "mid", "hig" ],
            value: "high"
        },
        {
            type: "slider",
            name: 'peakHt',
            label: 'Peak height',
            description: 'Height of the highest point on the petal.',
            min: 120,
            max: 600,
            value: 420
        },
        {
            type: "single-select",
            name: 'freq',
            label: 'Frequency Range',
            description: 'Select the frequency range the ring will respond to.',
            options: [ "low", "mid", "hig" ],
            value: "low"
        }
    ];
    return retList;
  }


  // --------------------------




  let sceneObj;




  let copies = 4;
  let color = 0xee7785;
  let freq = 'low';
  let peak = 360;
  let profileIn = [ [0, 0, 605], [0, 400, 720], [0, 952, 116] ];
  let profileOt = [ [150, 0, 530], [260, 540, 660], [100, 847, 140] ];
  let profileOt_mirr = JSON.parse(JSON.stringify(profileOt));
  profileOt_mirr[0][0] *= -1;
  profileOt_mirr[1][0] *= -1;
  profileOt_mirr[2][0] *= -1;


  // --------------------------


  function getFin(val=0.5) {


    let matMesh_red = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
    let i_bk_pts_start = profileIn;
    let o_bk_pts_start = profileOt;
    let o_bk_pts_mirr_start = profileOt_mirr;

    let i_bk_pts = JSON.parse(JSON.stringify(i_bk_pts_start));
    let o_bk_pts = JSON.parse(JSON.stringify(o_bk_pts_start));
    let o_bk_pts_mirr = JSON.parse(JSON.stringify(o_bk_pts_mirr_start));

    let d = peak * val;

    // let n = new THREE.Vector3(i_bk_pts[1][1]).normalize().multiply(d);
    // let v = new THREE.Vector3(i_bk_pts_start[1][1]);
    // v.add(n);

    i_bk_pts[1][1] = i_bk_pts_start[1][1] + d;

    let i_bk = verb.geom.NurbsCurve.byPoints( i_bk_pts, 2 );
    let o_bk = verb.geom.NurbsCurve.byPoints( o_bk_pts, 2 );
    let o_bk_mirr = verb.geom.NurbsCurve.byPoints( o_bk_pts_mirr, 2 );

    let o_bk_crv = verb.geom.NurbsCurve.byPoints( o_bk_pts, 2 );

    let bk_crv =    [
    o_bk_crv,
    verb.geom.NurbsCurve.byPoints( i_bk_pts, 2 ),
    verb.geom.NurbsCurve.byPoints( o_bk_pts_mirr, 2 )
    ];
    let srf_bk = verb.geom.NurbsSurface.byLoftingCurves( bk_crv, 2 );

    let mesh = new THREE.Mesh( srf_bk.toThreeGeometry(), matMesh_red );
    return mesh;
  }


  // --------------------------



  this.init = async function(scene, PARAMOBJ) {


      let obj = new THREE.Object3D();
      for (let i = 0; i < copies; i++) {
        let r = (i/copies) * (Math.PI * 2);
        let fin = getFin();
        fin = rotateAboutPoint(fin, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), r);
        obj.add(fin);
      }

      sceneObj = obj;
      scene.add(obj);

    }



  // cnt, col, prfIn, prfOt, pk, frq
  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {


    copies = PARAMOBJ["copies"] || copies;
    color = PARAMOBJ["color"] || color;
    freq = PARAMOBJ["freq"] || freq;
    peak = PARAMOBJ["peakHt"] || peak;
    let pI = PARAMOBJ["profileIn"] || "low";
    profileIn = getInnerProfile(pI);
    let pO = PARAMOBJ["profileOut"] || "low";
    profileOt = getOuterProfile(pO);
    profileOt_mirr = JSON.parse(JSON.stringify(profileOt));
    profileOt_mirr[0][0] *= -1;
    profileOt_mirr[1][0] *= -1;
    profileOt_mirr[2][0] *= -1;



    // --------------------------

    let arr = (freq == 'hig') ? FREQOBJ['higFreqArray'] : (freq == 'mid') ? FREQOBJ['midFreqArray'] : FREQOBJ['lowFreqArray'];

    let cp = copies;

    if (sceneObj !== 'undefined') scene.remove(sceneObj);

    let obj = new THREE.Object3D();
    for (let i = 0; i < cp; i++) {
      let r = (i/cp) * (Math.PI * 2);
      let v = remap(0, 255, 0, 1, arr[i]);
      let fin = getFin(v);
      fin = rotateAboutPoint(fin, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), r);
      obj.add(fin);
    }

    scene.add(obj);
    sceneObj = obj;


  }




}








async function getRefs() {
  return ["js/eqs/refs/verb.min.js", "js/eqs/refs/verb-utility.js"];
}


async function getObj() {
    return WavyPetal;
}