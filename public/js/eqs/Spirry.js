

function Spirry() {
    


  this.info = {
    "name": "Spirry",
    "description": "A twirling line ring.",
    "author": "amitlzkpa"
  }



  // --------------------------



  // spiral algorithm: https://gist.github.com/bellbind/c9d885349db114d98734

  // // ES6 Math polyfill
  // let tanh = Math.tanh || function tanh(x) {
  //     return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
  // }; 
  // let cosh = Math.cosh || function cosh(x) {
  //     return (Math.exp(x) + Math.exp(-x)) / 2;
  // }; 
  // let sinh = Math.sinh || function sinh(x) {
  //     return (Math.exp(x) - Math.exp(-x)) / 2;
  // };

  // let sz = 16, cxy = 100, cz = cxy * sz;
  // let hxy = Math.PI / cxy, hz = Math.PI / cz;
  // let r = 20;
  // for (let i = -cz; i < cz; i++) {
  //     let lxy = i * hxy;
  //     let lz = i * hz;
  //     let rxy = r /  cosh(lz);
  //     let x = rxy * Math.cos(lxy);
  //     let y = rxy * Math.sin(lxy);
  //     let z = r * tanh(lz);
  //     obj.geometry.vertices.push(new THREE.Vector3(x, y, z));
  // }



  // --------------------------



  this.getParamaterConfiguration = function() {
    let retList = [
        {
            type: "slider",
            name: 'radius',
            label: 'Radius',
            description: 'Set the radius.',
            min: 60,
            max: 900,
            value: 600
        },
        {
            type: "slider",
            name: 'maxHt',
            label: 'Max height',
            description: 'Set the max height of the spikes.',
            min: 1000,
            max: 2000,
            value: 1200
        },
        {
            type: "color",
            name: 'color',
            label: 'Color',
            description: 'Set the color.',
            value: 0x000fff
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
  


  let VIZOBJS = [];



  let radius = 600;
  let maxHt = 60;
  let color = 0x000fff;
  let freq = 'low';



  this.init = async function(scene, PARAMOBJ) {
    if(typeof PARAMOBJ !== "undefined") {
        radius = PARAMOBJ["radius"] || radius;
        maxHt = PARAMOBJ["maxHeight"] || maxHt;
        color = PARAMOBJ["color"] || color;
        freq = PARAMOBJ["targetFrequency"] || freq;
    }
    let colMat = new THREE.LineBasicMaterial({color: color });


    let obj = new THREE.Line(new THREE.Geometry(), colMat);
    obj.geometry.dynamic = true;

    let sz = 64;
    let d = (Math.PI * 2) / sz;
    for (let i = 0; i <= sz; i++) {
        let x = radius * Math.cos((i/sz) * (Math.PI * 2));
        let y = 0;
        let z = radius * Math.sin((i/sz) * (Math.PI * 2));
        obj.geometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    scene.add(obj);
    let n = `spirry-${radius}-${maxHt}-${color}`;
    VIZOBJS[n] = obj;
  }


  // --------------------------


  this.renderFrame = async function(scene, FREQOBJ, PARAMOBJ) {
    let arr = (freq == 'hig') ? FREQOBJ['higFreqArray'] :
              (freq == 'mid') ? FREQOBJ['midFreqArray'] :
                                FREQOBJ['lowFreqArray'];

    let n = `spirry-${radius}-${maxHt}-${color}`;
    let obj = VIZOBJS[n];
    for (let i = 0; i < obj.geometry.vertices.length; i++) {
        let v = obj.geometry.vertices[i];
        let d = (i * 7) % obj.geometry.vertices.length;
        let s = modulus_idx(arr, d);
        v.y = remap(0, 100, 12, maxHt, s);
    }
    obj.geometry.vertices[obj.geometry.vertices.length-1] = obj.geometry.vertices[0]
    obj.geometry.verticesNeedUpdate = true;
  }
}





async function getRefs() {
  return [];
}



async function getObj() {
  return Spirry;
}