// Source - https://stackoverflow.com/a/55695127
// Posted by jonathan Heindl, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-11, License - CC BY-SA 4.0

  const names = [ "Jupiter", "Saturn", "Uranus", "Neptune", "Ceres", "Nemesis","Dephanov","Podaohiri","Xeviea","Noluna","Hoibos","Yenope","Straditov","Zoenov","Sapus","Kepler","Pasteur","Boltzmann","Gezeacarro","Xagricury","Vulmone","Ochion","Liavis","Roitis","Galoria","Phucohiri","Your Anus"]

function focusOnPlanet(planet) {
  // Centre la caméra sur la planète
  camera.targetX = planet.x;
  camera.targetY = planet.y;

  // Zoom adapté à la taille de la planète
  camera.targetZoom = 5;

  // Suivi continu : met à jour la position à chaque frame
  camera.following = planet;
}

const camera = {
  x: 0, y: 0,
  targetX: 0, targetY: 0,
  zoom: 1, targetZoom: 1,
  following: null
};

// À appeler dans votre boucle d'animation (requestAnimationFrame)
function updateCamera() {
  if (camera.following) {
    camera.targetX = camera.following.x;
    camera.targetY = camera.following.y;
  }

  // Interpolation douce (lerp) pour un mouvement fluide
  camera.x += (camera.targetX - camera.x) * 0.1;
  camera.y += (camera.targetY - camera.y) * 0.1;
  camera.zoom += (camera.targetZoom - camera.zoom) * 0.05;
}

var addedmasses = document.getElementById("addedMasses")
  class nBodyProblem {
    constructor(params) {
      this.g = params.g;
      this.dt = params.dt;
      this.softeningConstant = params.softeningConstant;
  
      this.masses = params.masses;
    }
  
    updatePositionVectors() {
      const massesLen = this.masses.length;
  
      for (let i = 0; i < massesLen; i++) {
        const massI = this.masses[i];
  
        massI.x += massI.vx * this.dt;
        massI.y += massI.vy * this.dt;
        massI.z += massI.vz * this.dt;
      }
  
      return this;
    }
  
    updateVelocityVectors() {
      const massesLen = this.masses.length;
  
      for (let i = 0; i < massesLen; i++) {
        const massI = this.masses[i];
  
        massI.vx += massI.ax * this.dt;
        massI.vy += massI.ay * this.dt;
        massI.vz += massI.az * this.dt;
      }
    }
  
    updateAccelerationVectors() {
      const massesLen = this.masses.length;
  
      for (let i = 0; i < massesLen; i++) {
        let ax = 0;
        let ay = 0;
        let az = 0;
  
        const massI = this.masses[i];
  
        for (let j = 0; j < massesLen; j++) {
          if (i !== j) {
            const massJ = this.masses[j];
  
            const dx = massJ.x - massI.x;
            const dy = massJ.y - massI.y;
            const dz = massJ.z - massI.z;
  
            const distSq = dx * dx + dy * dy + dz * dz;
  
            const f =
              (this.g * massJ.m) /
              (distSq * Math.sqrt(distSq + this.softeningConstant));
  
            ax += dx * f;
            ay += dy * f;
            az += dz * f;
          }
        }
  
        massI.ax = ax;
        massI.ay = ay;
        massI.az = az;
      }
  
      return this;
    }
  }
  
  /*
   * Inputs for our nBodyProblem
   */
  
  const g = 39.5;
  const dt = 0.008; //0.005 years is equal to 1.825 days
  const softeningConstant = 0.15;
  
  const masses = [{
      name: "Sun", //We use solar masses as the unit of mass, so the mass of the Sun is exactly 1
      m: 1,
      x: -1.50324727873647e-6,
      y: -3.93762725944737e-6,
      z: -4.86567877183925e-8,
      vx: 3.1669325898331e-5,
      vy: -6.85489559263319e-6,
      vz: -7.90076642683254e-7,
      radius:5
    },
    {
      name: "Mercury",
      m: 1.65956463e-7,
      x: -0.346390408691506,
      y: -0.272465544507684,
      z: 0.00951633403684172,
      vx: 4.25144321778261,
      vy: -7.61778341043381,
      vz: -1.01249478093275,
      radius:0.5
    },
    {
      name: "Venus",
      m: 2.44699613e-6,
      x: -0.168003526072526,
      y: 0.698844725464528,
      z: 0.0192761582256879,
      vx: -7.2077847105093,
      vy: -1.76778886124455,
      vz: 0.391700036358566,
      radius:1
    },
    {
      name: "Earth",
      m: 3.0024584e-6,
      x: 0.648778995445634,
      y: 0.747796691108466,
      z: -3.22953591923124e-5,
      vx: -4.85085525059392,
      vy: 4.09601538682312,
      vz: -0.000258553333317722,
      radius:1
    },
    {
      m: 3.213e-7,
      name: "Mars",
      x: -0.574871406752105,
      y: -1.395455041953879,
      z: -0.01515164037265145,
      vx: 4.9225288800471425,
      vy: -1.5065904473191791,
      vz: -0.1524041758922603,
      radius:0.5
    }
  ];
  
  /*
   * Create an instance of the nBodyProblem with the inputs above
   * We clone the masses array by parsing a stringified version of it so that we can reset the simulator with a minimum amount of fuss
   */ 
  
  const innerSolarSystem = new nBodyProblem({
    g,
    dt,
    masses: JSON.parse(JSON.stringify(masses)),   
    softeningConstant
  });

  const planets = innerSolarSystem.masses;
  if (planets.length > 0) {
    focusOnPlanet(planets[3]);
  }
  
  /*
   * Motion trails
   */
  
  class Manifestation {
    constructor(ctx, trailLength, radius) {
      this.ctx = ctx;
    
      this.trailLength = trailLength;
  
      this.radius = radius;
  
      this.positions = [];
    }
  
    storePosition(x, y) {
      this.positions.push({
        x,
        y
      });
  
      if (this.positions.length > this.trailLength) this.positions.shift();
    }
  
    draw(x, y) {
      this.storePosition(x, y);
  
      const positionsLen = this.positions.length;
  
      for (let i = 0; i < positionsLen; i++) {
        let transparency;
        let circleScaleFactor;
  
        const scaleFactor = i / positionsLen;
  
        if (i === positionsLen - 1) {
          transparency = 1;
          circleScaleFactor = 1;
        } else {
          transparency = scaleFactor / 2;      
          circleScaleFactor = scaleFactor;
        }
  
        this.ctx.beginPath();
        this.ctx.arc(
          this.positions[i].x,
          this.positions[i].y,
          circleScaleFactor * this.radius,
          0,
          2 * Math.PI
        );
        this.ctx.fillStyle = `rgb(0, 153, 193, ${transparency})`;
  
        this.ctx.fill();
      }
    }
  }
  
  /*
   * Get the canvas element and its context from the DOM
   */
  
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  
  /*
   * Full screen action
   */
  
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  
  /*
   * Animation constants
   *
   * scale is the number of pixels per astronomical units
   *
   * radius is the radius of the circle that represents the current position of a mass
   *
   * trailLength is the number of previous positions that we should draw in the motion trail
   */
  
  const scale = 70;
const radius = 4;
  const trailLength = 35;
  
  /*
   * Iterate over the masses being simulated and add a visual manifestation for each of them
   */
  
  const populateManifestations = masses => {
    masses.forEach(
      mass =>
      (mass["manifestation"] = new Manifestation(
        ctx,
        trailLength,
        radius
      ))
    );
  };
  
  populateManifestations(innerSolarSystem.masses);

  /*
   * Click the reset button to reset the simulation
  */

  document.querySelector('#reset-button').addEventListener('click', () => {
    innerSolarSystem.masses = JSON.parse(JSON.stringify(masses));
    populateManifestations(innerSolarSystem.masses);       
  }, false);
  
  /*
   * Code for adding masses with you mouse
   */
  
  //Step 1.
  
  let mousePressX = 0;
  let mousePressY = 0;
  
  //Step 2.
  
  let currentMouseX = 0;
  let currentMouseY = 0;
  
  //Step 3.
  
  let dragging = false;
      
  //Step 4.
  
  canvas.addEventListener(
    "mousedown",
    e => {
      mousePressX = e.clientX;
      mousePressY = e.clientY;
      dragging = true;
    },
    false
  );
  
  //Step 5
  
  canvas.addEventListener(
    "mousemove",
    e => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
    },
    false
  );
  
  //Step 6
 
  const massesList = addedmasses;
     
  
  canvas.addEventListener(
    "mouseup",
    e => {
      const x = (mousePressX - width / 2) / scale;
      const y = (mousePressY - height / 2) / scale;
      const z = 0;
      const vx = (e.clientX - mousePressX) / 35;
      const vy = (e.clientY - mousePressY) / 35;
      const vz = 0;
  
      innerSolarSystem.masses.push({
    name: names[Math.floor(Math.random()*21)],
        m: parseFloat(massesList.value),
        x,
        y,
        z,
        vx,
        vy,
        vz,
        manifestation: new Manifestation(ctx, trailLength, radius),
        
        
      });
  
      dragging = false;
    },
    false
  );
  
  /*
   * The animate function that sets everything in motion.
   * We run it 60 times a second with the help of requestAnimationFrame
   */
  function collisionDynamics(radius, mass1, mass2){
  if(mass1.destroyed||mass2.destroyed){
  	return;
  }
  
  if( Math.abs(mass1.x -mass2.x) < radius/60){
  if( Math.abs(mass1.y -mass2.y) < radius/60){
    if(mass1.m>mass2.m){

    mass1.m+= mass2.m;
    mass2.destroyed = true;
    }else{
    mass2.m+=mass1.m;
    
    mass1.destroyed = true;    }
  }
  }
  }
  const animate = () => {
    innerSolarSystem
      .updatePositionVectors()
      .updateAccelerationVectors()
      .updateVelocityVectors();

    const massesLen = innerSolarSystem.masses.length;
    for (let i = 0; i < massesLen; i++) {
      const massI = innerSolarSystem.masses[i];
      if (massI.destroyed) {
        continue;
      }

      for (let j = i + 1; j < massesLen; j++) {
        const massJ = innerSolarSystem.masses[j];
        if (massJ.destroyed) {
          continue;
        }
        collisionDynamics(4, massI, massJ);
      }
    }

    draw();
    requestAnimationFrame(animate);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.x * scale, -camera.y * scale);

    const massesLen = innerSolarSystem.masses.length;
    ctx.font = "15px Arial";

    for (let i = 0; i < massesLen; i++) {
      const massI = innerSolarSystem.masses[i];

      if (massI.destroyed) {
        continue;
      }

      const drawX = massI.x * scale;
      const drawY = massI.y * scale;

      massI.manifestation.draw(drawX, drawY);

      if (massI.name) {
        ctx.fillText(massI.name, drawX + 12, drawY + 4);
      }

      const x = width / 2 + massI.x * scale;
      const y = height / 2 + massI.y * scale;
      if (x < radius || x > width - radius) massI.vx = -massI.vx;
      if (y < radius || y > height - radius) massI.vy = -massI.vy;
    }

    ctx.restore();

    if (dragging) {
      ctx.beginPath();
      ctx.moveTo(mousePressX, mousePressY);
      ctx.lineTo(currentMouseX, currentMouseY);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }

    updateCamera();
  }

  animate();
 