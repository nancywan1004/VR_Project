var boundaries = {x: [-20, 20], y: [0, 10], z: [-20, 20]}

function checkWithinBoundaries(pos) {
  return pos.x >= boundaries.x[0] && pos.x <= boundaries.x[1] && pos.y >= boundaries.y[0] && pos.y <= boundaries.y[1] && pos.z >= boundaries.z[0] && pos.z <= boundaries.z[1];
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function changeRandomDirection(pos, rot) {
  if (pos.x < boundaries.x[0] && pos.x > boundaries.x[1]) {
    rot.x += getRandomArbitrary(Math.PI / 2, Math.PI)
  }

  if (pos.y < boundaries.y[0] && pos.y > boundaries.y[1]) {
    rpt.y += getRandomArbitrary(Math.PI / 2, Math.PI)
  }

  if (pos.z < boundaries.z[0] && pos.z > boundaries.z[1]) {
    rot.z += getRandomArbitrary(Math.PI / 2, Math.PI)
  }

}

AFRAME.registerComponent('fish', {
    schema: {
    from: {default: {x: 2, y: 2, z: -2}, type: 'vec3'},
    to: {default:  {x: 2, y: 2, z: -4}, type: 'vec3'},
    speed: {default: 0.01, type: 'number'},
    direction: {default: {x: -1, y: 0, z: -1}, type: 'vec3'}
    },

    init: function () {
    var data = this.data;
    var el = this.el;
    el.object3D.position.copy(data.from)
    this.el.addEventListener('click', function () {
        // console.log("data.to is: " + data.to)
        console.log("quaternion" + el.object3D.quaternion.x)
        console.log("rotation" + el.object3D.rotation.x)
        // el.object3D.scale.copy(data.to);
        el.object3D.position.copy(data.to)
    });
    },

    tick: function () {
    var data = this.data;
    var el = this.el
    if (checkWithinBoundaries(el.object3D.position)) {
        el.object3D.position.x += data.speed * data.direction.x
        el.object3D.position.z += data.speed * data.direction.z
    }
    }
});